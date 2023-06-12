import React, { useEffect } from 'react'
import {ABI, Address} from '../Solidity'
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import $ from 'jquery';

export default function Sentreq() {
  let account, data;

  useEffect(() => {
    previous();
  },[]);

  const previous = async()=>{
    if(window.ethereum!=="undefined"){
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
          account = accounts[0]
          window.web3 = await new Web3(window.ethereum);
          window.contract = await new window.web3.eth.Contract(ABI, Address);
      data = await window.contract.methods.getfromDev().call();
      let sno = 1;
          for(let i = data.length-1;i>=0;i--){
        let tBody = ``;
              let temp = data[i];
              const client = new Web3Storage({
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlBOGE4NzY2YUFhOWU5ODg2RkZBRTkxOTk3YmNjNTY4OGIwQzU3ODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODM1MjI0NDA4NTcsIm5hbWUiOiJCTENQTVMifQ.el8vn5gRewLcqY_7eba8bXz0pTP-DOZszJt9gNa9e0A"
              });
              let data1 = await client.get(temp.patch);
              const blob = new Blob([data1], { type: 'application/octet-stream' });
              const url = URL.createObjectURL(blob);
        tBody+=`<td><center><strong>${sno++}</strong></center></td>
        <td><center><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#data${i}">
            BUGS & FEATURES
          </button></center></td>
          <td><center><strong>${temp.patchName}</strong></center></td>
          <td><center><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#desc${i}">
            PATCH DESCRIPTION
          </button></center></td>`
          if(data[i].vno.length>0) tBody+=`<td><center><strong>${temp.vno}</strong></center></td>`
          else tBody+=`<td><center>NOT UPLOADED</center></td>`
                      tBody+=`<td><center>${temp.timeofReport}</center></td>`
          if(temp.approved==1) tBody+=`<td><a href="${url}" download = "${temp.filename}" className="btn btn-secondary">DOWNLOAD</a></td>`
          else tBody+=`<td><center>PENDING</center></td>`
          if(temp.deployed==false && temp.approved == 1){
            tBody+=`<td><center id="deployed${i}"><button className="btn btn-secondary" onclick="deploynow(${i})" >DEPLOY</button></center></td>`
          }
          else if(temp.deployed==false) tBody+=`<td><center>N/A</center></td>`
          else if(temp.deployed==true){
            tBody+=`<td><center id="deployed${i}">DEPLOYED</center></td>`
          }
          let tr = document.createElement('tr');
          if(data.length!=0){
            let tbody = document.getElementById('fordeploy');
            tr.innerHTML = tBody;
            tbody.appendChild(tr);
          }
  
          }
          for(let i = 0;i<data.length;i++){
        let modd=``
              let temp = data[i];
          // modd+=`<div className="modal fade" id="data${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="data${i}Label" aria-hidden="true">`
          modd+=`<div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="data${i}Label">Bugs and Features Cleared</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row mt-3 gx-3">
                  <div className="col">
                    <div className="list-group" id="bugsof${i}"></div>
                  </div>
                  <div className="col">
                    <div className="list-group" id="featuresof${i}"></div>
                  </div>
                </div>`
          modd+=`</div>
            </div>
          </div>`
          let div = document.createElement('div');
          div.setAttribute('class', 'modal fade');
          div.setAttribute('id', `data${i}`);
          div.setAttribute('data-bs-backdrop', 'static');
          div.setAttribute('data-bs-keyboard', 'false');
          div.setAttribute('tabindex', '-1');
          div.setAttribute('aria-labelledby', `data${i}Label`);
          div.setAttribute('aria-hidden', 'true');
          let modalsDiv = document.getElementById('modals');
          div.innerHTML = modd;
          modalsDiv.appendChild(div);
        const bugsDiv = document.getElementById(`bugsof${i}`);
        for(j in temp.bugRequest){
          let temp1 = temp.bugRequest[j];
          const li = document.createElement('li');
          li.className = 'list-group-item list-group-item-action';
          li.innerHTML = `
          <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">${temp1[0]}</h5>
          </div>
          <p className="mb-1">${temp1[1]}</p>
          <small>PRIORITY: ${temp1[2]}</small>`;
          bugsDiv.appendChild(li);
        }
        const featuresDiv = document.getElementById(`featuresof${i}`);
          for(j in temp.featureRequest){
            let temp1 = temp.featureRequest[j];
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.innerHTML = `
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">${temp1[0]}</h5>
              </div>
              <p className="mb-1">${temp1[1]}</p>
              <small>PRIORITY: ${temp1[2]}</small>`;
            featuresDiv.appendChild(li);
          }
        let dd = temp.patchDescription.split("\n");
        let desc=`<div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
        <h1 className="modal-title fs-5" id="descof${i}">PATCH DESCRIPTION</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">`
        for(j in dd){
          desc+=`${dd[j]}<br>`
        }
        desc+=`</div>
        </div>
        </div>`
        div = document.createElement('div');
        div.setAttribute('class', 'modal fade');
        div.setAttribute('id', `desc${i}`);
        div.setAttribute('data-bs-backdrop', 'static');
        div.setAttribute('data-bs-keyboard', 'false');
        div.setAttribute('tabindex', '-1');
        div.setAttribute('aria-labelledby', `descof${i}`);
        div.setAttribute('aria-hidden', 'true');
        modalsDiv = document.getElementById('modals');
        div.innerHTML = desc;
        modalsDiv.appendChild(div);
          }
          // document.getElementById('modals').innerHTML = modd
          $(document).ready(function(){
              $('#example').DataTable();
          });
    }
  }
  return (
    <>
      <div className="container my-3 bg-light p-3" id="requests">
        <table id="example" className="table table-striped">
            <thead>
                <tr>
                    <th><center>Serial Number</center></th>
                    <th><center>Requests taken</center></th>
                    <th><center>Patch Name</center></th>
                    <th><center>Patch Description</center></th>
                    <th><center>Version Number</center></th>
                    <th><center>Time of Approval/Deployment</center></th>
                    <th><center>Download</center></th>
                    <th><center>Deployment Status</center></th>
                </tr>
            </thead>
            <tbody id="fordeploy">
            </tbody>
            </table>
    </div>
    <div id="modals"></div>
    </>
  )
}