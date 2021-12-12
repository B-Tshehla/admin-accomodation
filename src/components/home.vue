<template>
    <div>
         <div class="auth-wrapper-home">
            <div class="auth-inner-home"> 
                <div v-if="!isSelected">
                  <h3>Current Users</h3>
                    <b-table class="table" 
                    striped hover 
                    :items="items" 
                    :fields="fields"
                    :select-mode="selectMode"
                    responsive="sm"
                    ref="selectableTable"
                    selectable
                    @row-selected="onRowSelected"
                    ></b-table>
                </div>

                <div v-if="isSelected" class="container">
                  <h3>Selected Student</h3>
                  <div class="row align-items-start">
                    <div class="col">
                          <h4>Personal Information</h4>

                        <p><b>First Name:</b>
                          {{selected[0].firstName}}</p>
                        <p><b>Last Name:</b>
                          {{selected[0].lastName}}</p>
                        <p><b>Contact Number:</b>
                          {{selected[0].conNum}}</p>
                        <p><b>Identity Number:</b>
                          {{selected[0].idNum}}</p>

                          <h4>Primary Next Of Keen Information</h4>

                        <p><b>First Name:</b>
                          {{selected[0].kfName}}</p>
                        <p><b>Last Name:</b>
                          {{selected[0].klName}}</p>
                        <p><b>Contact Number:</b>
                          {{selected[0].kconNum}}</p>
                        <p><b>Relationship:</b>
                          {{selected[0].realation}}</p>

                          <h4>Secondary Next Of Keen Information</h4>

                        <p><b>First Name:</b>
                          {{selected[0].seckfName}}</p>
                        <p><b>Last Name:</b>
                          {{selected[0].secklName}}</p>
                        <p><b>Contact Number:</b>
                          {{selected[0].seckconNum}}</p>
                        <p><b>Relationship:</b>
                          {{selected[0].secrealation}}</p>

                          <h4>Medical History</h4>  
                        <p>{{selected[0].medHistory}}</p>
                          
                      </div>
                      <div class="col">
                        <div v-if="!isDocument">
                          <h4>Profile Picture</h4>
                          <b-col>
                            <b-img thumbnail fluid :src="selected[0].profile" alt="Image 1"></b-img>
                          </b-col>
                        </div>
                        <div v-if="isDocument">
                          <h4>Uploaded Documents</h4>
                          <p>
                            <b>ID Copy: </b>
                            <a v-bind:href="idCopy"  target="_blank">Document</a>
                            
                          </p>
                          <p>
                            <b>Proof of Registration:</b>
                            <a v-bind:href="proofOfReg"  target="_blank">Document</a>
                            
                          </p>
                          <p>
                            <b>Proof Of Residents:</b>
                            <a v-bind:href="proofOfAddress"  target="_blank">Document</a>
                          </p>
                          <p>
                            <b>NFSAS Approval Letter:</b>
                            <a v-bind:href="nfsasApproval"  target="_blank">Document</a>
                          </p>
                        </div>
                         
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                          <b-button block variant="primary" @click="back">Back</b-button>
                      </div>
                      <div class="col">
                          <b-button block variant="success" @click="uploaded">Documents</b-button>
                      </div>
                      
                    </div>
                    
                </div>
                
            </div>
         </div>
    </div>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import { collection, getDocs,doc, getDoc } from "firebase/firestore";

export default {
    name:'home',
   async created(){
      const db= getFirestore();
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           //console.log(doc.id, " => ", doc.data());
            this.items.push(doc.data());
          
            });
    },
     data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: [
          //'firstName', 
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'firstName',
            label: 'First Name',
            sortable:true,
            
          },
          {
            key:'lastName',
            label: 'Last Name',
            sortable:true,
           
          },
          {
            key:'conNum',
            label:'Contact Number',
            
          },
          {
            key:'idNum',
            label:'Identity Number',
            
          },
          
        ],
        items: [],
        studData:[],
        selectMode: 'single',
        selected: [],
        isSelected:false,
        isDocument:false,
        idCopy:null,
        proofOfReg:null,
        proofOfAddress:null,
        nfsasApproval:null,
      }
    },
    methods: {
        back(){
          this.isSelected=false;
             
        },
        onRowSelected(items){
          
          console.log(items);
          this.selected=items;
          this.isSelected=true;
          
        },
        async uploaded(){
          const db= getFirestore();
          const docRef = doc(db, "suporting",this.selected[0].userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            this.idCopy=docSnap.data().idCopy;
            this.proofOfReg=docSnap.data().proofOfReg;
            this.proofOfAddress=docSnap.data().proofOfAddress;
            this.nfsasApproval=docSnap.data().nfsasApproval;
          } else {
          // doc.data() will be undefined in this case
            console.log("No such document!");
          }

          this.isDocument=true;
        }
          
    },
}
</script>

<style>

  *{
      box-sizing: border-box;
    }

  body{
    /*background: #0f4374 !important;*/
    background-image: url("..//assets//background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: 'Fira Sans',sans-serif;
    text-align: center;
  }

  h1,h2,h3,h4,h5,h6, label,span{
    font-weight: 500;
    font-family: 'Fira Sans',sans-serif;
  }

  body,html,#app,#root,.auth-wrapper-home{
    width: 100%;
    height: 100%;
  }



.auth-wrapper-home{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner-home{
  width:1200px;
  max-width: 100%;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba( 34 ,35,58,0.2); 
  padding: 40px 55px 45px 55px;
  border-radius: 0;
  transition: all .3s;
}

.auth-wrapper-home .form-control:focus{
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper-home h3{
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
a{
  text-decoration: none;
}



</style>