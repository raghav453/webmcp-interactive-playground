// Original, fictional data; no network, account authority or durable storage.
export const catalog=Object.freeze([
 Object.freeze({id:'lamp-01',name:'Desk lamp',price:45,currency:'USD'}),
 Object.freeze({id:'lamp-02',name:'Floor lamp',price:95,currency:'USD'}),
 Object.freeze({id:'chair-01',name:'Reading chair',price:160,currency:'USD'})
]);
const documents=Object.freeze([
 {id:'registration',title:'Register and remove a tool',summary:'Await registration; abort its lifecycle signal on teardown.'},
 {id:'validation',title:'Validate tool input',summary:'Reject wrong types, unknown fields and unbounded input.'},
 {id:'confirmation',title:'Review a consequential draft',summary:'Show the exact payload; cancel or expire pending review.'}
]);
export function validate(input,allowed){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new TypeError('Input must be an object');
 for(const key of Object.keys(input))if(!allowed.includes(key))throw new TypeError('Unknown input field: '+key);
}
export function text(value,label,max){if(typeof value!=='string'||!value.trim()||value.trim().length>max)throw new TypeError(label+' must contain 1–'+max+' characters');return value.trim();}
export function searchCatalog(input){validate(input,['query','maxPrice']);const query=text(input.query,'query',80).toLowerCase();if(input.maxPrice!==undefined&&(typeof input.maxPrice!=='number'||!Number.isFinite(input.maxPrice)||input.maxPrice<0||input.maxPrice>100000))throw new TypeError('maxPrice must be a finite number from 0 to 100000 USD');const items=catalog.filter(p=>p.name.toLowerCase().includes(query)&&(input.maxPrice===undefined||p.price<=input.maxPrice)).map(p=>({...p}));return {items,count:items.length,fictionalData:true};}
export function searchDocs(input){validate(input,['query']);const query=text(input.query,'query',80).toLowerCase();const items=documents.filter(d=>(d.title+' '+d.summary).toLowerCase().includes(query)).map(d=>({...d}));return {items,count:items.length,fictionalData:true};}
export function serviceAvailability(input){validate(input,['region']);if(!['north','south'].includes(input.region))throw new TypeError('region must be north or south');return {region:input.region,available:input.region==='north',source:'fictional fixture',fictionalData:true};}
export function prepareRequest(input){validate(input,['message']);return Object.freeze({message:text(input.message,'message',240),recipient:'Fictional demo support',fictionalData:true});}
export function checkAbort(signal){if(signal?.aborted)throw signal.reason||new DOMException('Canceled','AbortError');}
const querySchema={type:'object',properties:{query:{type:'string',minLength:1,maxLength:80}},required:['query'],additionalProperties:false};
export function createTools({review,render=()=>{},log=()=>{}}={}){
 const read=(name,title,description,inputSchema,handler)=>({name,title,description,inputSchema,annotations:{readOnlyHint:true},execute:async(input,options={})=>{checkAbort(options.signal);const result=handler(input);checkAbort(options.signal);render(name,result);log(name,'read-only result');return result;}});
 return [
  read('search_catalog','Search catalogue','Search public fictional equipment; optional maxPrice is in USD; no purchase or account access.',{...querySchema,properties:{...querySchema.properties,maxPrice:{type:'number',minimum:0,maximum:100000}}},searchCatalog),
  read('search_docs','Search documentation','Find short fictional implementation notes by query.',querySchema,searchDocs),
  read('service_availability','Check service availability','Look up fictional availability for north or south; creates no booking.',{type:'object',properties:{region:{type:'string',enum:['north','south']}},required:['region'],additionalProperties:false},serviceAvailability),
  {name:'prepare_support_request',title:'Review a support draft',description:'Prepare a fictional support draft for human review. Nothing is sent; approval records only local demo state.',inputSchema:{type:'object',properties:{message:{type:'string',minLength:1,maxLength:240}},required:['message'],additionalProperties:false},annotations:{consequentialHint:true},execute:async(input,options={})=>{checkAbort(options.signal);const proposal=prepareRequest(input);if(typeof review!=='function')throw new Error('A human review interface is required');log('prepare_support_request','awaiting human review');const approved=await review(proposal,options.signal);checkAbort(options.signal);const result={status:approved?'recorded_locally':'canceled',proposal,fictionalData:true,sent:false};render('prepare_support_request',result);log('prepare_support_request',result.status);return result;}}
 ];
}
// The consequential hint is conservative for local state; it is not enforcement.
