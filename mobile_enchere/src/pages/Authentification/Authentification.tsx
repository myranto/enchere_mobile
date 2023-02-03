
import React, {useEffect} from "react";
import {BaseUrl} from "../../BaseUrl";
//
// export default class Authentification extends React.Component<any, any>{
//     public url: string;
//     constructor(props:any) {
//         super(props);
//         this.state = {
//             data: [],
//             message:'',
//             error:''
//         };
//         this.url = '';
//     }
//     Authenticate(){
//         const user1 = localStorage.getItem("client");
//         const val = (user1!=null)?JSON.parse(user1):null;
//         if ((val==null) || (!val.hasOwnProperty("id"))) {
//             setOne(0)
//             throw 'not log in again';
//         }
//         this.url = BaseUrl+"enchere/cli/checkToken/"+val.id+"/"+val.token;
//     }
//     componentDidMount() {
//         if (this.url!==''){
//             fetch(this.url)
//                 .then(response => response.json())
//                 .then(data => this.setState({ data }))
//                 .catch(e => {this.setState(
//                     {
//                         message:e.message,
//                         data:null,
//                         error:e.message
//                     }
//                 )
//                 setOne(0)}
//                 );
//         }
//     }
//     render() {
//         if (getOne()===0){
//             try {
//                 this.Authenticate();
//                 if (this.state.error!=='')
//                     throw this.state.error;
//             }catch (e:any){
//                 setOne(1)
//                 console.log(e);
//                 window.location.href = "/log";
//             }
//         }
//         return super.render();
//     }
// }
export const CheckToken:React.FC = () =>{
    let link = '';
    // const check = () =>{
        const user1 = sessionStorage.getItem("client");
        const val = (user1!=null)?JSON.parse(user1):null;
        if ((val==null) || (!val.hasOwnProperty("id"))) {

            window.location.replace("/log");
        }
        link = BaseUrl+"enchere/cli/checkToken/"+val.id+"/"+val.token;
    // }

        useEffect(() => {
            if (link!=='') {
                fetch(link)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.error!==null){
                            window.location.replace("/log");

                        }
                    })
                    .catch((e) => {
                        console.log(e)
                    });
            }
        },[]);
    return(
        <>
        </>
    )
}
export const checkStorage=()=>{
    const user1 = sessionStorage.getItem("client");
    const val = (user1!=null) ? JSON.parse(user1) : null;
    if ((val==null) || (!val.hasOwnProperty("id"))) {
        return  false;
    }
    return true;
}