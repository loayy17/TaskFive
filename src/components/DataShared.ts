import { ref } from 'vue';
export type TDataType = {
    numOfTables: number;
    pageSize: number; 
    currentPage: number 
};
const data = ref<TDataType>({
    numOfTables: 1, 
    pageSize: 10,
    currentPage:1   
});
export default data;

