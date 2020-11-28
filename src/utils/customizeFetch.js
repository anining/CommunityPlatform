import {createClient} from "@supabase/supabase-js";
import postgrester from "postgrester";
import PostgREST from 'postgrest-client'
import {API_URL} from "./config";
import {setter, getter} from "../utils/store";
import axios from 'axios'
import PGHelper, { not, and, or, eq, gt } from 'postgrest-api-helper';
import { like, _in } from 'postgrest-api-helper'

const linkClient = () => {};
const axiosInstance = axios.create({});
const helper = new PGHelper(axiosInstance);

function customizeFetch (method, url, data={}) {
	switch(method) {
		case "GET":
			const {authorization} = getter(['authorization'])
			return new Promise((resolved, rejected) => {
				helper.get(API_URL + url).setBody({}).addHeader('authorization', authorization.get()).then(r => {
					resolved({error: null,data: r[1].data})
				})
			})
		case "POST":
			return new Promise((resolved, rejected) => {
				helper.post(API_URL + url).setBody(data).then(r => {
					resolved({error: null,data: r[1].data})
				})
			})
	}




	// helper.post(API_URL+"/rpc/merchant_login").setBody(data).then(r => {
	// 	access_token = r[1].data.access_token
	// 	const axiosI= axios.create({});
	// 	const h= new PGHelper(axiosI);
	// 	console.log(access_token)
		// fetchSpec("https://test2-omnivstore.prismslight.com/", access_token).then(r => {
		// 	console.log(r)
		// })

		// h.get(API_URL + "/oplogs").setBody({ id: 'some-id', age: 27 }).order('created_at', false).pagination(1,14,false).setQueries({merchant_id: 1,type: 'login',id:43 }).and(eq("merchant_id"),eq('id')).addHeader( 'authorization', "Bearer " + access_token ).then(r => {

		// h.get(API_URL + "/cmnt_padjs").addHeader( 'authorization', "Bearer " + access_token ).then(r => {})

		// h.post(API_URL + "/cmnt_padjs").setBody({ name: "ssasasasasasassssssssssssssssssssss999xxx",status:"process",  ctg_id: 1, unit_cost: 1, prices: [1,1,1,1], }).addHeader( 'authorization', "Bearer " + access_token ).then(r => {
		// 	console.log(r)
		// })

		// h.delete(API_URL + "/oplogs").setQueries({id: 37}).eq('id').addHeader( 'authorization', "Bearer " + access_token ).then(r => {
		// })
	// })
  // const {supabase} = getter(["supabase"]);
	// console.log(data)
	// const a = supabase.get().post("/rpc/merchant_login",data).then(r => {
		// // r.access_token
	// })
	// console.log(a)
	// const a = supabase.get().rpc("merchant_login",data)
	// console.log(a)
	// return
	// const a = supabase.get().auth.signIn(data).then(r => {
	// 	console.log(r)
	// })
}

export {linkClient, customizeFetch};
