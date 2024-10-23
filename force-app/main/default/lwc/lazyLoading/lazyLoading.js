import { LightningElement } from 'lwc';
import  loadDataById from '@salesforce/apex/InfiniteDataLoader.loadDataById';
import  loadMoreData from '@salesforce/apex/InfiniteDataLoader.loadMoreData';
import  countTotalAccount from '@salesforce/apex/InfiniteDataLoader.countTotalAccount';


const columns = [
    {label : 'Name' , fieldName : 'Name'},
    {label : 'Industry' , fieldName : 'Industry'}
];
export default class LazyLoading extends LightningElement {
columns = columns;
totalRecord=0;
recordLoaded = 0
data =[];

connectedCallback(){
    this.loadData();
}

async loadData(){
    try {
        
   this.totalRecord =  await countTotalAccount();
   this.data = await loadDataById();
   this.recordLoaded = this.data.length;

    } catch (error) {
        console.log('error while loading', error);
    }
}

 async  loadMoreDatas(event){
    try {
        
            const {target} = event ;
            target.isLoading = true;
            let currentRecord = this.data;
            let lastRecord = currentRecord[currentRecord.length - 1];
          let newRecords =  await loadMoreData({
                lastName : lastRecord.Name,
                lastId : lastRecord.Id
            });

            this.data = [...currentRecord,...newRecords];
            this.recordLoaded = this.data.length;
            target.isLoading = false;
    } catch (error) {
        console.log('error',error)
    }
}

}