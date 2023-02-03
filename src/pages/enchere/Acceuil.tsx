import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonButtons, IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonMenuButton, IonPage,
    IonSelect,
    IonSelectOption, IonTitle,
    IonToolbar
} from "@ionic/react";
import {BaseUrl} from "../../BaseUrl";
import Menu from "../../components/Menu";
import {useHistory} from "react-router";

export const Acceuil:React.FC = () =>{
    const iduser = sessionStorage.getItem("idclient");
    const link = BaseUrl+"enchere/cli/enchere/create";
    const style={
        color:"red"
    };
    const [error,setError] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [imageBase64, setImageBase64] = useState<string>('');
    const [res,setRes] = useState<string[]>([]);

    const [list,setList] = useState<any>(null);
    useEffect(() => {
        fetch(BaseUrl+"enchere/admin/categorie")
            .then((response) => response.json())
            .then((data) => {
                setList(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const convertBase64 = (e:any) =>{
        const file = e.target.files;
        // alert(file.length)
        const gmi:string[] = [];
        for (let i = 0; i <file.length ; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(file[i]);
            reader.onload = () => {
                const uri =  reader.result as string;
                setImage(uri);
                gmi[i] = uri;
            };
        }
        setRes(gmi);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = e.target;
        const description = formData.elements.namedItem('description').value;
        const catego = formData.elements.namedItem('catego').value;
        const dure = formData.elements.namedItem('dure').value;
        const mise = formData.elements.namedItem('mise').value;
        const mv = formData.elements.namedItem('mv').value;
        const list_pic = [];
        for (let i = 0; i < res.length; i++) {
            const tmp = {
                "pic_name":res[i]
            }
            list_pic[i]=tmp;
        }
        const json = {
            "enchere":{
                    "idclient":{
                        "id":iduser
                    },
                    "prix_vente":mv,
                    "prix_mise_enchere":mise,
                    "idcategorie":{
                        "id":catego
                    },
                    "duree":dure,
                    "description":description,
                    "status":0
            },
            "pic":list_pic
        }
        fetch(
            link,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                // alert(res.data)
                if (res.error!==null){
                    setError(res.error)
                }else{
                    alert(res.data)
                    window.location.href = "/ownListencher";
                }
            })
            .catch((error) => {
                console.error(error);
                //TODO implement error
            });
    }
    const history = useHistory();
    return (
      <IonPage>
          {/*<Menu/>*/}
          <IonHeader>
              <IonToolbar>
                  <IonButtons slot="start">
                      <IonMenuButton/>
                  </IonButtons>
                  <IonTitle>Ajout enchere</IonTitle>
              </IonToolbar>
                  <IonButton onClick={()=>history.goBack()}>
                      return
                  </IonButton>
          </IonHeader>
        {/*{res?.length}*/}
          <IonContent fullscreen forceOverscroll={false}>

          <main className="page contact-us-page">
              <section className="clean-block clean-form dark">
                  <div className="container">
          <form onSubmit={handleSubmit}>
              <h1 className="text-center">Enchere form</h1>
              <label htmlFor="description">description</label>
              <IonInput type="text" name="description" placeholder={"set description ... "} className="form-control"></IonInput><br/>
              <label htmlFor="description">choix categorie</label>

              <IonSelect name="catego" placeholder="choix categorie" className="form-control" mode="ios">
                  {list?.map((e:any)=><Value categorie={e} key={e.id}/>)}
              </IonSelect>
              <label htmlFor="dure">dure enchere</label>
              <IonInput type="number" name="dure" min={0} className="form-control"></IonInput><br/>

              <label htmlFor="mise">prix de mise enchere</label>
              <IonInput type="number" name="mise"  min={0} className="form-control"></IonInput><br/>

              <label htmlFor="mv">prix minimale de vente</label>
              <IonInput type="number" min={0} name="mv"className="form-control"></IonInput><br/>


              <label htmlFor="pwdconf">insert image</label>
                <input className="form-control" type="file" multiple onChange={convertBase64} />
              <h3 style={style}>{error}</h3>
              {/*<IonImg src={image} />*/}
             <table border={1}>
                 <thead>
                     <tr>
                         <th>image</th>
                         <th>cscs</th>
                         {/*<th><IonImg src={res} /></th>*/}
                     </tr>
                 </thead>
                 <tbody>
                 {res?.map((e:any)=><Images key={e} img={e} />)}
                </tbody>

             </table>

              <IonButton type="submit" className="btn btn-primary">Valider</IonButton>
          </form>
                  </div>
              </section>
          </main>
          </IonContent>
      </IonPage>
    );
}
const Value: React.FC<any> = ({categorie}) => {
    return (
            <IonSelectOption value={categorie.id} >{categorie.nom}</IonSelectOption>
    );
}
const Images:React.FC<any> = (img) =>{
    // console.log("ito le image "+JSON.stringify(img))
    return (
      <tr >
          <th>1</th>
          <th><img src={img.img} width={50} height={50} /></th>
          {/*<th><IonImg src={img.img} /></th>*/}
      </tr>
    );
}