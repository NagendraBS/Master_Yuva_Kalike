import axios from "axios";
import { ADMIN_BASE_URL } from "../utils/Config";
import {saveFiltereData} from '../utils/LocalStorage'

export async function createGroups(details) {
  const data = {
    groupName:details.groupName,
    description:details.description,
    organizationId:details.organizationId,
    createdBy:details.createdBy
  };
  return await axios.post(ADMIN_BASE_URL + "group/create" , data);
}

export async function removeGroup(groupId , status , payload) {
  return await axios.put(ADMIN_BASE_URL + "group/status/" + groupId + "/" + status , payload);
}
export async function updateGroups(data) {
  return await axios.put(ADMIN_BASE_URL + "group/update" , data);
}
export async function getGroupsCount(enterpriseId) {
  return await axios.get(ADMIN_BASE_URL + "getGroupsCount/" + enterpriseId);
}
export async function getUsersCount(enterpriseId) {
  return await axios.get(ADMIN_BASE_URL + "getUsersCount/" + enterpriseId);
}

export async function getallDomains(){
  return await axios.get(ADMIN_BASE_URL+"getAllDomain")
}
export async function getDomains(organizationId){
   
  return await axios.get(ADMIN_BASE_URL+"getDomain/"+organizationId);
}

export async function updateDomainStatus(enterpriseId,status){
  return await axios.get(ADMIN_BASE_URL+`updateDomainStatus/${enterpriseId}/${status}`)
}

export async function updateDomainDetails(data) {
  return await axios.put(ADMIN_BASE_URL + `updateDomain`,data);
}

export async function getGroups(organizationId) {
  return await axios.get(ADMIN_BASE_URL + "group/organization/" + organizationId);
}

export async function getUsers(organizationId) {
  return await axios.get(ADMIN_BASE_URL + "users/" + organizationId);
}

export async function addUserGroups(data) {
  return await axios.put(ADMIN_BASE_URL + "group/add/users" , data);
}
//get added users from group
export async function getGroupUsers(data) {
  return await axios.get(ADMIN_BASE_URL + "users/group/" + data);
}
//get added roles from group
export async function getGroupRoles(data) {
  return await axios.get(ADMIN_BASE_URL + "role/group/" + data);
}

export async function removeUserGroups(data) {
  return await axios.put(ADMIN_BASE_URL + "group/remove/users" , data);
}

export async function addGroupRole(data) {
  return await axios.put(ADMIN_BASE_URL + "group/add/role" ,data);
}

export async function removeGroupRole(data) {
  return await axios.put(ADMIN_BASE_URL + "group/remove/role" , data);
}

export async function getRole(data) {
  return await axios.get(ADMIN_BASE_URL + "roles/A" , data);
}

export async function saveUser(data) {
  return await axios.post(ADMIN_BASE_URL + "user/add",data);
}

export async function saveDomain(data){
  return await axios.post(ADMIN_BASE_URL+`createDomain`,data);
}

export async function updateUser(data) {
  return await axios.put(ADMIN_BASE_URL + `user/update`,data);
}
export async function deleteUserDetails(userId) {
  return await axios.delete(ADMIN_BASE_URL + `user/delete/${userId}`);
}

export async function getOrganization() {
  const enterpriseId = JSON.parse(localStorage.getItem("userInfo"))?.enterpriseId
  return await axios.get(ADMIN_BASE_URL + `organization/enterprise/${enterpriseId}`);
}

export async function saveOrganization(data) {
  return await axios.post(ADMIN_BASE_URL + `organization/add`, data);
}

export async function updateOrganization(data) {
  return await axios.put(ADMIN_BASE_URL + `organization/update`, data);
}

export async function removeOrg( organizationId, status ,payload ) {
  return await axios.put(ADMIN_BASE_URL + "organization/status/" + organizationId + "/" + status , payload);
}

export async function getOrganizationDetails(organizationId) {
  return await axios.get(ADMIN_BASE_URL + `organization/`+ organizationId);
}

export async function getDatabase(orgId) {
  return await axios.get(ADMIN_BASE_URL + `datasources/` + orgId);
}

export async function getDatabaseDetails(dataSourceId) {
  const response = await axios.get(ADMIN_BASE_URL + `datasource/` + dataSourceId);
  saveFiltereData(dataSourceId, response);
  return response;
}

export async function deleteDatabaseDetails(dataSourceId) {
  return await axios.delete(ADMIN_BASE_URL + `datasource/${dataSourceId}`);
}

export async function saveDatabase(data) {
  return await axios.post(ADMIN_BASE_URL + `datasource/save` , data);
}

export async function updateDatabase(data) {
  return await axios.put(ADMIN_BASE_URL + `datasource/update` , data);
}

export async function getTestConnection() {
  return await axios.post(ADMIN_BASE_URL + `/testconnection`);
}

export async function UpdateTheme(actorId,roleId,createdBy,colour,font,bgcolour,fontcolor,fontcolor1)
{
 const data ={
  actorId:actorId,
  roleId:roleId,
  createdBy:createdBy,
  themePattern : {
    colour:colour,
    font:font,
    bgcolour:bgcolour,
    fontcolor:fontcolor,
    fontcolor1:fontcolor1,
  }
 }
 return await axios.put(ADMIN_BASE_URL + `theme/update`,data);
}
export async function postTheme(actorId,roleId,createdBy,colour,font,bgcolour,fontcolor,fontcolor1)
{
 const data ={
  actorId:actorId,
  roleId:roleId,
  createdBy:createdBy,
  themePattern : {
    colour:colour,
    font:font,
    bgcolour:bgcolour,
    fontcolor:fontcolor,
    fontcolor1:fontcolor1,
  }
 }
 return await axios.post(ADMIN_BASE_URL + `theme/add`,data);
}

