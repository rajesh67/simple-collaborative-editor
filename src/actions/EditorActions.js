import { FETCH_DATA, START_EDITING, STOP_EDITING } from "./type";

export const fetchData = () => dispatch =>{
    console.log("Fetching data from database/server");
    fetch('http://localhost:8000/data/',{
        headers : {
			'Content-Type':'application/json'
		},
		method : "GET"
    }).then(res => res.json())
        .then(data =>{
            dispatch({
                type : FETCH_DATA,
                payload : data
            })
            // console.log(data);
        });
}

