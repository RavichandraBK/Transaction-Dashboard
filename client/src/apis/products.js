import axios from "axios";

const url = `${process.env.REACT_APP_BACKEND_URL}/api/products`;
const tableUrl = `${url}/`;
// const statsUrl = `${url}/stats`;
// const barUrl = `${url}/bar-data`;
// const pieUrl = `${url}/pie-data`;
const combinedUrl = `${url}/combined-data`;

const TableData = async (prompt) => {
  try {
    const sendData = { ...prompt };
    const tdata = await axios.post(tableUrl, sendData);

    return tdata;
  } catch (err) {
    console.log("couldnt fetch data from api", err);
  }
};
// const StatsData = async(prompt)=>{
//     try {
//         const sendData = {...prompt}
//         const sdata = await axios.post(statsUrl,sendData);
//         return sdata;
//     } catch (err) {
//         console.log('couldnt fetch data from api',err);
//     }
// }
// const PieData = async(prompt)=>{
//     try {
//         const sendData = {...prompt}
//         const piedata = await axios.post(pieUrl,sendData);
//         return piedata;
//     } catch (err) {
//         console.log('couldnt fetch data from api',err);
//     }
// }
// const BarData = async(prompt)=>{
//     try {
//         const sendData = {...prompt}
//         const bardata = await axios.post(barUrl,sendData);
//         return bardata;
//     } catch (err) {
//         console.log('couldnt fetch data from api',err);
//     }
// }
const CombinedData = async (month) => {
  try {
    const sendData = { month };
    const response = await axios.post(combinedUrl, sendData);
    return response;
  } catch (err) {
    console.log("couldnt fetch data from api", err);
  }
};
export { TableData, CombinedData };
