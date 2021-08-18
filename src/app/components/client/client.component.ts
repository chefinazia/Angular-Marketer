import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service'
import {Client} from '../../store/models/client.model'
import { NzMessageService } from 'ng-zorro-antd/message';
import * as XLSX from "xlsx"
import * as _ from 'lodash';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client: Client[];
 title="Client"
 selectedFiles: FileList;
  constructor(private clientService:ClientService,private message: NzMessageService) {  }

  ngOnInit(): void {
    this.clientService.getClient().subscribe(data =>{
      this.listOfData = data.map(e=>{

        return Object.assign({id: e.payload.doc.id },e.payload.doc.data())
      })
      this.updateEditCache();
    })

  }

  searchValue = '';
  visible = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Client[] = [];
  listOfData: readonly Client[] = [];
  setOfCheckedId = new Set<any>();
  editCache: { [key: string]: { edit: boolean; data: Client } } = {};
  // editCache = new Map()
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item =>{ console.log(item);
     this.updateCheckedSet(item.id, value)});
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Client[]): void {
    this.listOfCurrentPageData = this.listOfData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfCurrentPageData = this.listOfData.filter((item: Client) => item.name.indexOf(this.searchValue) !== -1);
  }
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }
  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  saveEdit(id: string): void {
    // const index = this.listOfData.findIndex(item => item.id === id);
    // Object.assign(this.listOfData[index], this.editCache[id].data);
    this.clientService.updateClient(id,this.editCache[id].data)
    this.editCache[id].edit = false;
  }
  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };

    //   this.editCache.set(item.id,{edit: false,
    //     data: { ...item }})
    });
  }
  onDelete(id:string){
    this.clientService.deleteClient(id)
  }
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  uploadClient(event) :void{
    console.log(event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf('.')+1));

     if(event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf('.')+1).toLowerCase() =="xlsx" ){
       this.selectedFiles = event.target.files;
     }else{
      this.message.create("error", `file must be in XLXS format`);
     }
  }
  toggle(){

    if(this.selectedFiles){

      return true
    }
    else{
      return false
    }


  }
  back(){
    this.selectedFiles = null
  }

  upload(){
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(this.selectedFiles[0])
    fileReader.onload = (event) =>{
      console.log(event);
      let binaryData= event.target.result
      let workbook = XLSX.read(binaryData,{type:"binary"})
      // console.log(workbook);
      workbook.SheetNames.forEach(sheet =>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]) as Client[]
         let unique =  data.filter(o1 => !this.listOfData.some(o2 => o1.email === o2.email));
         console.log(unique);

        unique&& unique.map(e =>{
          this.clientService.createClient(e)
        })
        this.isVisible = false;
        this.selectedFiles = null
      } )

    }
  }
}
