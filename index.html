<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SwitchGear — Datacenter QA Tracker</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb; min-height: 100vh; }
    input, select, textarea, button { font-family: inherit; }

    /* Utility resets */
    .flex { display: flex; } .flex-1 { flex: 1; } .flex-wrap { flex-wrap: wrap; }
    .items-center { align-items: center; } .items-start { align-items: flex-start; }
    .justify-between { justify-content: space-between; } .justify-center { justify-content: center; }
    .grid { display: grid; } .grid-cols-2 { grid-template-columns: repeat(2,1fr); }
    .grid-cols-3 { grid-template-columns: repeat(3,1fr); }
    .gap-1 { gap: 4px; } .gap-2 { gap: 8px; } .gap-3 { gap: 12px; } .gap-4 { gap: 16px; }
    .space-y-2 > * + * { margin-top: 8px; } .space-y-3 > * + * { margin-top: 12px; }
    .space-y-4 > * + * { margin-top: 16px; }
    .w-full { width: 100%; } .min-w-0 { min-width: 0; } .shrink-0 { flex-shrink: 0; }
    .max-w-5xl { max-width: 64rem; } .mx-auto { margin-left: auto; margin-right: auto; }
    .px-2 { padding-left: 8px; padding-right: 8px; }
    .px-3 { padding-left: 12px; padding-right: 12px; }
    .px-4 { padding-left: 16px; padding-right: 16px; }
    .px-5 { padding-left: 20px; padding-right: 20px; }
    .px-6 { padding-left: 24px; padding-right: 24px; }
    .py-1 { padding-top: 4px; padding-bottom: 4px; }
    .py-1\.5 { padding-top: 6px; padding-bottom: 6px; }
    .py-2 { padding-top: 8px; padding-bottom: 8px; }
    .py-2\.5 { padding-top: 10px; padding-bottom: 10px; }
    .py-3 { padding-top: 12px; padding-bottom: 12px; }
    .py-4 { padding-top: 16px; padding-bottom: 16px; }
    .py-5 { padding-top: 20px; padding-bottom: 20px; }
    .py-6 { padding-top: 24px; padding-bottom: 24px; }
    .py-8 { padding-top: 32px; padding-bottom: 32px; }
    .pt-1 { padding-top: 4px; } .pt-2 { padding-top: 8px; } .pt-4 { padding-top: 16px; }
    .pb-1 { padding-bottom: 4px; } .mt-0\.5 { margin-top: 2px; } .mt-1 { margin-top: 4px; }
    .mt-2 { margin-top: 8px; } .mt-3 { margin-top: 12px; } .ml-auto { margin-left: auto; }
    .ml-1 { margin-left: 4px; } .ml-2 { margin-left: 8px; } .mr-2 { margin-right: 8px; }
    .mb-1 { margin-bottom: 4px; } .mb-2 { margin-bottom: 8px; } .mb-3 { margin-bottom: 12px; }
    .mb-4 { margin-bottom: 16px; }
    .text-xs { font-size: 12px; } .text-sm { font-size: 14px; } .text-lg { font-size: 18px; }
    .text-xl { font-size: 20px; } .text-2xl { font-size: 24px; }
    .font-medium { font-weight: 500; } .font-semibold { font-weight: 600; }
    .font-bold { font-weight: 700; } .font-mono { font-family: monospace; }
    .italic { font-style: italic; }
    .tracking-tight { letter-spacing: -0.025em; } .tracking-wide { letter-spacing: 0.025em; }
    .uppercase { text-transform: uppercase; }
    .text-white { color: #fff; }
    .text-gray-400 { color: #9ca3af; } .text-gray-500 { color: #6b7280; }
    .text-gray-600 { color: #4b5563; } .text-gray-700 { color: #374151; }
    .text-gray-800 { color: #1f2937; } .text-blue-600 { color: #2563eb; }
    .text-blue-700 { color: #1d4ed8; } .text-green-600 { color: #16a34a; }
    .text-green-700 { color: #15803d; } .text-red-400 { color: #f87171; }
    .text-red-600 { color: #dc2626; } .text-orange-700 { color: #c2410c; }
    .text-purple-700 { color: #7e22ce; }
    .bg-white { background: #fff; } .bg-gray-50 { background: #f9fafb; }
    .bg-gray-100 { background: #f3f4f6; } .bg-gray-900 { background: #111827; }
    .bg-green-500 { background: #22c55e; } .bg-red-500 { background: #ef4444; }
    .bg-blue-600 { background: #2563eb; } .bg-red-600 { background: #dc2626; }
    .bg-green-100 { background: #dcfce7; } .text-green-800 { color: #166534; }
    .bg-red-100 { background: #fee2e2; } .bg-orange-100 { background: #ffedd5; }
    .bg-purple-100 { background: #f3e8ff; } .text-purple-800 { color: #6b21a8; }
    .bg-yellow-100 { background: #fef9c3; } .text-yellow-700 { color: #a16207; }
    .bg-yellow-400 { background: #facc15; } .bg-orange-500 { background: #f97316; }
    .border { border: 1px solid #e5e7eb; } .border-b { border-bottom: 1px solid #e5e7eb; }
    .border-t { border-top: 1px solid #e5e7eb; } .border-2 { border-width: 2px; }
    .border-gray-200 { border-color: #e5e7eb; } .border-gray-300 { border-color: #d1d5db; }
    .border-gray-600 { border-color: #4b5563; } .border-blue-500 { border-color: #3b82f6; }
    .border-red-200 { border-color: #fecaca; } .border-transparent { border-color: transparent; }
    .rounded { border-radius: 4px; } .rounded-lg { border-radius: 8px; }
    .rounded-xl { border-radius: 12px; } .rounded-full { border-radius: 9999px; }
    .rounded-t-lg { border-top-left-radius: 8px; border-top-right-radius: 8px; }
    .overflow-hidden { overflow: hidden; } .overflow-y-auto { overflow-y: auto; }
    .overflow-x-auto { overflow-x: auto; }
    .shadow { box-shadow: 0 1px 3px rgba(0,0,0,.1); }
    .shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,.05); }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1); }
    .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0,0,0,.25); }
    .fixed { position: fixed; } .relative { position: relative; } .sticky { position: sticky; }
    .inset-0 { top:0;right:0;bottom:0;left:0; } .top-0 { top:0; } .top-4 { top:16px; }
    .right-4 { right:16px; } .z-10 { z-index:10; } .z-50 { z-index:50; }
    .min-h-screen { min-height: 100vh; }
    .max-h-screen { max-height: 100vh; }
    .h-1\.5 { height: 6px; } .h-3 { height: 12px; } .w-4 { width:16px; } .w-10 { width:40px; } .h-10 { height:40px; }
    .w-24 { width: 96px; } .w-36 { width: 144px; }
    .leading-none { line-height: 1; }
    .transition { transition: all .15s; }
    .cursor-pointer { cursor: pointer; }
    .text-center { text-align: center; } .text-left { text-align: left; }
    .opacity-70 { opacity: .7; } .opacity-80 { opacity: .8; } .opacity-40 { opacity: .4; }
    .whitespace-nowrap { white-space: nowrap; }
    .bg-black { background: #000; } .bg-opacity-40 { background-color: rgba(0,0,0,.4); }
    .max-w-sm { max-width: 24rem; } .max-w-lg { max-width: 32rem; } .max-w-2xl { max-width: 42rem; }
    .divide-y > * + * { border-top: 1px solid #f3f4f6; }
    .ring-2 { box-shadow: 0 0 0 2px #3b82f6; }
    table { border-collapse: collapse; width: 100%; }
    th, td { text-align: left; }
    .focus\:outline-none:focus { outline: none; }
    .focus\:ring-2:focus { box-shadow: 0 0 0 2px #60a5fa; }
    button { cursor: pointer; background: none; border: none; }
    select, input, textarea { width: 100%; }
    .hover\:text-gray-700:hover { color: #374151; }
    .hover\:bg-red-700:hover { background: #b91c1c; color: #fff; }
    .hover\:opacity-100:hover { opacity: 1; }
    .bg-gradient-to-br { background: linear-gradient(135deg, #facc15, #f97316); }

    /* Input styles */
    .sg-input {
      width: 100%; border: 1px solid #d1d5db; border-radius: 8px;
      padding: 8px 12px; font-size: 14px;
      outline: none; transition: box-shadow .15s;
    }
    .sg-input:focus { box-shadow: 0 0 0 2px #93c5fd; border-color: #60a5fa; }
  </style>
</head>
<body>
<div id="root"></div>
<script>
const { useState, useEffect, useCallback, useRef, createElement: h } = React;

function load(key, fb) { try { var v=localStorage.getItem(key); return v?JSON.parse(v):fb; } catch(e){return fb;} }
function save(key, val) { try { localStorage.setItem(key,JSON.stringify(val)); } catch(e){} }

var DEPT_LIST = ["QC","Test","UL","Rework"];
var DEPT_META = { QC:{icon:"🔍",desc:"Quality Control"}, Test:{icon:"⚡",desc:"Testing"}, UL:{icon:"✅",desc:"UL Certification"}, Rework:{icon:"🔧",desc:"Rework / Repair"} };
var DS = {
  QC:    {bg:"#eff6ff",border:"#bfdbfe",text:"#1e40af",btn:"#2563eb",badgeBg:"#dbeafe",badgeText:"#1e40af"},
  Test:  {bg:"#fefce8",border:"#fde68a",text:"#92400e",btn:"#d97706",badgeBg:"#fef9c3",badgeText:"#92400e"},
  UL:    {bg:"#faf5ff",border:"#d8b4fe",text:"#6b21a8",btn:"#7c3aed",badgeBg:"#ede9fe",badgeText:"#5b21b6"},
  Rework:{bg:"#fef2f2",border:"#fecaca",text:"#991b1b",btn:"#dc2626",badgeBg:"#fee2e2",badgeText:"#991b1b"}
};
var CAB_STATUSES = ["Pending","In Progress","Complete"];
var STATUS_CLS = {"Pending":"background:#f3f4f6;color:#4b5563","In Progress":"background:#fef9c3;color:#a16207","Complete":"background:#dcfce7;color:#15803d"};
var RESULT_CLS = {"Pass":"background:#dcfce7;color:#15803d","Fail":"background:#fee2e2;color:#dc2626","---":"background:#f3f4f6;color:#9ca3af"};
var NONE = "---";
var PIPELINE = ["QC","Test","UL"];

var SEED = {
  breakers:[], people:[], movements:[], logs:{}, photos:{}, reworkLogs:{},
  assignments:{QC:{},Test:{},UL:{},Rework:{}}, skids:[], bayAssignments:{},
  cabinets:[
    {id:"c1",name:"Panel A",moNumber:"MO-001",dept:"QC",status:"In Progress",result:NONE,notes:"",breakerIds:[]},
    {id:"c2",name:"Panel B",moNumber:"MO-002",dept:"QC",status:"Pending",result:NONE,notes:"",breakerIds:[]},
    {id:"c3",name:"Panel C",moNumber:"MO-003",dept:"Test",status:"Pending",result:NONE,notes:"",breakerIds:[]},
    {id:"c4",name:"Panel D",moNumber:"MO-004",dept:"UL",status:"Complete",result:"Pass",notes:"",breakerIds:[]}
  ]
};

function makeCab(id,name,mo,dept,carry){
  var b={id:id,name:name,moNumber:mo||"",dept:dept,status:"Pending",result:NONE,notes:"",breakerIds:[]};
  if(carry){if(carry.reworkCount)b.reworkCount=carry.reworkCount;if(carry.notes)b.notes=carry.notes;}
  return b;
}

function badge(text, styleCss) {
  return h("span",{style:{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:9999,display:"inline-block",...parseCss(styleCss)}},text);
}
function parseCss(s){ var o={}; if(!s)return o; s.split(";").forEach(function(p){ var kv=p.split(":"); if(kv.length===2)o[kv[0].trim().replace(/-([a-z])/g,function(m,c){return c.toUpperCase();})] = kv[1].trim(); }); return o; }

function Modal(p){
  return h("div",{style:{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.4)",padding:16}},
    h("div",{style:{background:"#fff",borderRadius:12,boxShadow:"0 25px 50px -12px rgba(0,0,0,.25)",width:"100%",maxWidth:p.wide?672:512,maxHeight:"90vh",overflowY:"auto"}},
      h("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:"1px solid #e5e7eb",position:"sticky",top:0,background:"#fff"}},
        h("h2",{style:{fontSize:18,fontWeight:600,color:"#1f2937"}},p.title),
        h("button",{onClick:p.onClose,style:{fontSize:24,color:"#9ca3af",lineHeight:1,background:"none",border:"none",cursor:"pointer"}},"×")
      ),
      h("div",{style:{padding:"16px 24px"}},p.children)
    )
  );
}

function Toast(p){
  return h("div",{style:{position:"fixed",top:16,right:16,zIndex:50,display:"flex",flexDirection:"column",gap:8,maxWidth:360}},
    p.toasts.map(function(t){
      return h("div",{key:t.id,style:{display:"flex",alignItems:"flex-start",gap:12,borderRadius:12,padding:"12px 16px",color:"#fff",background:t.type==="fail"?"#dc2626":"#2563eb",boxShadow:"0 10px 15px -3px rgba(0,0,0,.1)"}},
        h("div",{style:{flex:1}},
          h("p",{style:{fontSize:14,fontWeight:600}},t.title),
          h("p",{style:{fontSize:12,opacity:.8,marginTop:2}},t.body)
        ),
        h("button",{onClick:function(){p.onDismiss(t.id);},style:{background:"none",border:"none",color:"#fff",fontSize:20,cursor:"pointer",opacity:.7}},"×")
      );
    })
  );
}

function Field(p){
  return h("div",null,
    h("label",{style:{display:"block",fontSize:11,fontWeight:500,color:"#4b5563",marginBottom:4}},p.label),
    p.children
  );
}

function Inp(p){
  return h("input",Object.assign({},p,{className:"sg-input"}));
}

function Sel(p){
  return h("select",Object.assign({},p,{className:"sg-input"}));
}

function MoEdit(p){
  var ed=useState(false); var editing=ed[0]; var setEditing=ed[1];
  var vs=useState(p.cab.moNumber||""); var val=vs[0]; var setVal=vs[1];
  if(editing){
    return h("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:4}},
      h("input",{className:"sg-input",style:{width:144,fontSize:12,fontFamily:"monospace"},value:val,onChange:function(e){setVal(e.target.value);},autoFocus:true}),
      h("button",{onClick:function(){p.onSave(p.cab.id,{moNumber:val});setEditing(false);},style:{fontSize:12,color:"#2563eb",fontWeight:500,background:"none",border:"none",cursor:"pointer"}},"Save"),
      h("button",{onClick:function(){setEditing(false);setVal(p.cab.moNumber||"");},style:{fontSize:12,color:"#9ca3af",background:"none",border:"none",cursor:"pointer"}},"Cancel")
    );
  }
  return h("button",{onClick:function(){setEditing(true);},style:{fontSize:12,color:"#3b82f6",background:"none",border:"none",cursor:"pointer",marginTop:4}},
    p.cab.moNumber?"Edit M.O.":"+ Add M.O. number"
  );
}

function NotesModal(p){
  var ns=useState(p.cab.notes||""); var notes=ns[0]; var setNotes=ns[1];
  return h(Modal,{title:"Notes - "+p.cab.name,onClose:p.onClose},
    h("div",{style:{display:"flex",flexDirection:"column",gap:12}},
      h("textarea",{className:"sg-input",rows:6,placeholder:"Add notes...",value:notes,onChange:function(e){setNotes(e.target.value);},style:{resize:"vertical"}}),
      h("div",{style:{display:"flex",gap:8}},
        h("button",{onClick:function(){p.onSave(p.cab.id,{notes:notes});p.onClose();},style:{flex:1,background:"#2563eb",color:"#fff",border:"none",borderRadius:8,padding:"8px 0",fontSize:14,cursor:"pointer",fontWeight:500}},"Save Notes"),
        h("button",{onClick:p.onClose,style:{flex:1,border:"1px solid #e5e7eb",borderRadius:8,padding:"8px 0",fontSize:14,cursor:"pointer",color:"#4b5563",background:"#fff"}},"Cancel")
      )
    )
  );
}

function SendBackModal(p){
  var ts=useState(p.defaultDept||"QC"); var target=ts[0]; var setTarget=ts[1];
  return h(Modal,{title:"Send Back - "+p.cab.name,onClose:p.onClose},
    h("div",{style:{display:"flex",flexDirection:"column",gap:16}},
      h("p",{style:{fontSize:14,color:"#4b5563"}},"Select the department to send this cabinet back to."),
      h("div",{style:{display:"flex",gap:8}},
        PIPELINE.map(function(d){
          var active=target===d;
          return h("button",{key:d,onClick:function(){setTarget(d);},style:{flex:1,padding:"8px 0",borderRadius:8,fontSize:14,fontWeight:700,border:"2px solid",borderColor:active?DS[d].btn:"#e5e7eb",background:active?DS[d].btn:"#fff",color:active?"#fff":"#6b7280",cursor:"pointer"}},d);
        })
      ),
      h("div",{style:{display:"flex",gap:8}},
        h("button",{onClick:function(){p.onConfirm(target);p.onClose();},style:{flex:1,background:"#2563eb",color:"#fff",border:"none",borderRadius:8,padding:"8px 0",fontSize:14,cursor:"pointer",fontWeight:500}},"Confirm and Send Back"),
        h("button",{onClick:p.onClose,style:{flex:1,border:"1px solid #e5e7eb",borderRadius:8,padding:"8px 0",fontSize:14,cursor:"pointer",color:"#4b5563",background:"#fff"}},"Cancel")
      )
    )
  );
}

function CabinetCard(p){
  var cab=p.cab; var dept=p.dept;
  var sn=useState(false); var showNotes=sn[0]; var setShowNotes=sn[1];
  var sb=useState(false); var showSendBack=sb[0]; var setShowSendBack=sb[1];
  var ts=useState(""); var tech=ts[0]; var setTech=ts[1];
  var result=cab.result||NONE;
  var deptAssign=p.assignments[dept]||{};
  var personMap={};
  p.people.filter(function(x){return x.dept===dept;}).forEach(function(x){personMap[x.id]=x.name;});
  var pname=deptAssign[cab.name]?personMap[deptAssign[cab.name]]:null;
  var nextDept=PIPELINE[PIPELINE.indexOf(dept)+1];
  var borderColor=result==="Fail"?"#fca5a5":result==="Pass"?"#86efac":"#e5e7eb";

  var pipeBar=dept!=="Rework"?h("div",{style:{marginTop:12,display:"flex",alignItems:"center",gap:4}},
    PIPELINE.map(function(d,i){
      var dIdx=PIPELINE.indexOf(dept);
      var filled=i<dIdx||(i===dIdx&&cab.status!=="Pending");
      var active=i===dIdx;
      var bc=result==="Fail"&&active?"#f87171":filled?"#4ade80":(active&&cab.status==="In Progress")?"#fbbf24":"#e5e7eb";
      return h("div",{key:d,style:{display:"flex",alignItems:"center",gap:4,flex:1}},
        h("div",{style:{flex:1,height:6,borderRadius:9999,background:bc}}),
        h("span",{style:{fontSize:11,fontWeight:700,padding:"1px 4px",borderRadius:4,color:filled?"#15803d":"#9ca3af",boxShadow:active?"0 0 0 2px #3b82f6":"none"}},d)
      );
    }),
    h("div",{style:{marginLeft:4,height:6,width:16,borderRadius:9999,background:dept==="UL"&&cab.status==="Complete"&&result==="Pass"?"#4ade80":"#e5e7eb"}})
  ):null;

  return h("div",null,
    h("div",{style:{background:"#fff",borderRadius:12,padding:16,boxShadow:"0 1px 2px rgba(0,0,0,.05)",border:"1px solid "+borderColor}},
      h("div",{style:{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap"}},
        h("div",{style:{flex:1,minWidth:0}},
          h("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}},
            h("span",{style:{fontWeight:600,color:"#1f2937"}},cab.name),
            cab.moNumber?h("span",{style:{fontSize:11,fontFamily:"monospace",fontWeight:700,padding:"2px 8px",borderRadius:9999,background:"#f3f4f6",color:"#4b5563"}},"M.O. "+cab.moNumber):null,
            badge(cab.status, STATUS_CLS[cab.status]||""),
            badge(result===NONE?"No Result":result, RESULT_CLS[result]||""),
            (cab.reworkCount||0)>0?badge("Rework x"+cab.reworkCount,"background:#ffedd5;color:#c2410c"):null,
            cab.originDept?badge("From "+cab.originDept,"background:#ffedd5;color:#c2410c"):null,
            pname?badge("@ "+pname,"background:#f3e8ff;color:#7e22ce"):null
          ),
          cab.notes?h("p",{style:{fontSize:12,color:"#6b7280",marginTop:4,fontStyle:"italic"}},cab.notes):null,
          h(MoEdit,{cab:cab,onSave:p.onUpdate})
        ),
        h("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"flex-start"}},
          dept!=="Rework"?h("select",{className:"sg-input",style:{width:"auto",fontSize:12,padding:"4px 8px"},value:tech,onChange:function(e){setTech(e.target.value);}},
            h("option",{value:""},"Tech..."),
            p.people.filter(function(x){return x.dept===dept;}).map(function(x){return h("option",{key:x.id,value:x.name},x.name);})
          ):null,
          h("select",{className:"sg-input",style:{width:"auto",fontSize:12,padding:"4px 8px"},value:cab.status,onChange:function(e){p.onUpdate(cab.id,{status:e.target.value},e.target.value==="Complete"?tech:null);}},
            CAB_STATUSES.map(function(st){return h("option",{key:st},st);})
          ),
          dept!=="Rework"?h("div",{style:{display:"flex",borderRadius:6,overflow:"hidden",border:"1px solid #e5e7eb",fontSize:12,fontWeight:700}},
            h("button",{onClick:function(){p.onUpdate(cab.id,{result:result==="Pass"?NONE:"Pass"});},style:{padding:"4px 12px",background:result==="Pass"?"#22c55e":"#fff",color:result==="Pass"?"#fff":"#9ca3af",border:"none",cursor:"pointer"}},"Pass"),
            h("button",{onClick:function(){p.onUpdate(cab.id,{result:result==="Fail"?NONE:"Fail"});},style:{padding:"4px 12px",background:result==="Fail"?"#ef4444":"#fff",color:result==="Fail"?"#fff":"#9ca3af",border:"none",cursor:"pointer"}},"Fail")
          ):null,
          h("button",{onClick:function(){setShowNotes(true);},style:{fontSize:12,border:"1px solid "+(cab.notes?"#fcd34d":"#e5e7eb"),borderRadius:6,padding:"4px 8px",color:cab.notes?"#a16207":"#4b5563",background:"#fff",cursor:"pointer"}},"📝 Notes"),
          dept==="Rework"?h("button",{onClick:function(){setShowSendBack(true);},style:{fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:6,border:"2px solid #60a5fa",color:"#1d4ed8",background:"#fff",cursor:"pointer"}},"Send Back"):null,
          nextDept&&cab.status==="Complete"&&result==="Pass"?h("span",{style:{fontSize:12,color:"#16a34a",fontWeight:500}},"Ready for "+nextDept):null,
          dept==="UL"&&cab.status==="Complete"&&result==="Pass"?h("span",{style:{fontSize:12,color:"#15803d",fontWeight:700}},"✅ Certified"):null,
          h("button",{onClick:function(){if(confirm("Delete this cabinet?"))p.onDelete(cab.id);},style:{fontSize:12,border:"1px solid #fecaca",borderRadius:6,padding:"4px 8px",color:"#f87171",background:"#fff",cursor:"pointer"}},"Del")
        )
      ),
      pipeBar
    ),
    showNotes?h(NotesModal,{cab:cab,onSave:p.onUpdate,onClose:function(){setShowNotes(false);}}):null,
    showSendBack?h(SendBackModal,{cab:cab,defaultDept:cab.originDept||"QC",onConfirm:function(t){p.onSendBack(cab,t);},onClose:function(){setShowSendBack(false);}}):null
  );
}

function DeptView(p){
  var dept=p.dept; var db=p.db; var ds=DS[dept]; var dm=DEPT_META[dept];
  var deptCabs=db.cabinets.filter(function(c){return c.dept===dept;});
  var deptPeople=db.people.filter(function(x){return x.dept===dept;});
  var ms=useState(null); var modal=ms[0]; var setModal=ms[1];
  var cn=useState(""); var cabName=cn[0]; var setCabName=cn[1];
  var cm=useState(""); var cabMo=cm[0]; var setCabMo=cm[1];
  var np=useState(""); var newPerson=np[0]; var setNewPerson=np[1];
  var al=useState({}); var assignLocal=al[0]; var setAssignLocal=al[1];
  var aa=useState(false); var autoAssign=aa[0]; var setAutoAssign=aa[1];
  var total=deptCabs.length||1;
  var comp=deptCabs.filter(function(c){return c.status==="Complete";}).length;
  var inProg=deptCabs.filter(function(c){return c.status==="In Progress";}).length;
  var pend=deptCabs.filter(function(c){return c.status==="Pending";}).length;
  var passed=deptCabs.filter(function(c){return c.result==="Pass";}).length;
  var failed=deptCabs.filter(function(c){return c.result==="Fail";}).length;

  function upDb(patch){p.setDb(function(prev){var next=Object.assign({},prev,patch);save("sg_data",next);return next;});}
  function getNext(ca,people){if(!people.length)return null;var counts={};people.forEach(function(x){counts[x.id]=0;});Object.values(ca).forEach(function(pid){if(counts[pid]!==undefined)counts[pid]++;});return people.reduce(function(min,x){return counts[x.id]<counts[min.id]?x:min;}).id;}

  function updateCab(id,changes,completeTech){
    var cabs=db.cabinets.map(function(c){return c.id===id?Object.assign({},c,changes):c;});
    var cab=db.cabinets.find(function(c){return c.id===id;});
    if(changes.status==="Complete"&&cab){
      var nd=PIPELINE[PIPELINE.indexOf(dept)+1];
      var ts=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
      if(nd){
        p.onToast({type:"transition",title:dept+" → "+nd+": "+cab.name,body:(completeTech||"")+" at "+ts});
        var ex=cabs.find(function(c){return c.name===cab.name&&c.dept===nd&&c.status!=="Complete";});
        if(!ex)cabs.push(makeCab("cab_"+nd+"_auto_"+Date.now(),cab.name,cab.moNumber,nd,cab));
      } else {
        p.onToast({type:"transition",title:cab.name+" Fully Certified!",body:"All departments complete at "+ts});
      }
    }
    if(changes.result==="Fail"&&cab){
      var arw=cabs.find(function(c){return c.name===cab.name&&c.dept==="Rework"&&c.status!=="Complete"&&c.originDept===dept;});
      if(!arw){cabs.push(Object.assign(makeCab("rw_"+id+"_"+Date.now(),cab.name,cab.moNumber,"Rework",cab),{originDept:dept,status:"Pending",result:NONE}));p.onToast({type:"fail",title:"Sent to Rework: "+cab.name,body:"Failed "+dept});}
    }
    upDb({cabinets:cabs});
  }

  function sendBack(cab,target){
    var rc=(cab.reworkCount||0)+1;
    var updated=db.cabinets.filter(function(c){return c.id!==cab.id;});
    var existing=updated.find(function(c){return c.name===cab.name&&c.dept===target&&c.status!=="Complete";});
    if(!existing)updated.push(Object.assign(makeCab("sb_"+Date.now(),cab.name,cab.moNumber,target,cab),{originDept:target,reworkCount:rc,status:"Pending",result:NONE}));
    upDb({cabinets:updated});
    p.onToast({type:"transition",title:"Back to "+target+": "+cab.name,body:"Rework #"+rc+" complete"});
  }

  function deleteCab(id){upDb({cabinets:db.cabinets.filter(function(c){return c.id!==id;})});}

  function addCab(){
    if(!cabName.trim())return;
    var nc=makeCab("cab_"+dept+"_"+Date.now(),cabName.trim(),cabMo.trim(),dept);
    var na=Object.assign({},db.assignments);
    if(autoAssign){var pid=getNext(na[dept]||{},deptPeople);if(pid)na[dept]=Object.assign({},na[dept]||{},{[nc.name]:pid});}
    upDb({cabinets:db.cabinets.concat([nc]),assignments:na});
    setCabName("");setCabMo("");
  }

  function addPerson(){if(!newPerson.trim())return;upDb({people:db.people.concat([{id:"p_"+dept+"_"+Date.now(),name:newPerson.trim(),dept:dept}])});setNewPerson("");}
  function removePerson(pid){upDb({people:db.people.filter(function(x){return x.id!==pid;})});}
  function saveAssign(local){upDb({assignments:Object.assign({},db.assignments,{[dept]:local})});setModal(null);}

  var deptAssign=db.assignments[dept]||{};
  var personMap={};deptPeople.forEach(function(x){personMap[x.id]=x.name;});

  return h("div",{style:{display:"flex",flexDirection:"column",gap:16}},
    // Header
    h("div",{style:{borderRadius:12,padding:16,border:"1px solid "+ds.border,background:ds.bg,color:ds.text}},
      h("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}},
        h("div",null,
          h("h2",{style:{fontSize:18,fontWeight:700}},dm.icon+" "+dept+" — "+dm.desc),
          h("p",{style:{fontSize:12,opacity:.7,marginTop:2}},deptCabs.length+" cabinets / "+deptPeople.length+" staff")
        ),
        h("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},
          h("button",{onClick:function(){setModal("people");},style:{background:ds.btn,color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer",fontWeight:500}},"People"),
          h("button",{onClick:function(){setAssignLocal(Object.assign({},deptAssign));setModal("assign");},style:{background:ds.btn,color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer",fontWeight:500}},"Assign"),
          dept!=="Rework"?h("button",{onClick:function(){setAutoAssign(function(v){return !v;});},style:{fontSize:12,padding:"6px 12px",borderRadius:8,fontWeight:700,border:"2px solid",borderColor:autoAssign?"#22c55e":"#d1d5db",background:autoAssign?"#22c55e":"#fff",color:autoAssign?"#fff":"#6b7280",cursor:"pointer"}},autoAssign?"Auto-Assign ON":"Auto-Assign OFF"):null
        )
      )
    ),
    // Progress
    h("div",{style:{background:"#fff",borderRadius:12,border:"1px solid #e5e7eb",boxShadow:"0 1px 2px rgba(0,0,0,.05)",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12}},
      h("h3",{style:{fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:".05em"}},"Progress"),
      [{l:"Complete",v:comp,c:"#22c55e"},{l:"In Progress",v:inProg,c:"#fbbf24"},{l:"Pending",v:pend,c:"#d1d5db"}].map(function(m){
        var pct=Math.round(m.v/total*100);
        return h("div",{key:m.l},
          h("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4}},
            h("span",{style:{fontSize:12,color:"#4b5563"}},m.l),
            h("span",{style:{fontSize:12,fontWeight:700,color:"#374151"}},m.v+"/"+deptCabs.length+" ("+pct+"%)")
          ),
          h("div",{style:{width:"100%",background:"#f3f4f6",borderRadius:9999,height:12,overflow:"hidden"}},
            h("div",{style:{height:12,borderRadius:9999,background:m.c,width:pct+"%",transition:"width .3s"}})
          )
        );
      }),
      (passed+failed)>0?h("div",{style:{display:"flex",gap:12,paddingTop:8,borderTop:"1px solid #f3f4f6",flexWrap:"wrap",fontSize:12}},
        h("span",{style:{fontWeight:600,color:"#6b7280"}},"Results:"),
        h("span",{style:{fontWeight:700,color:"#15803d"}},"Pass: "+passed),
        h("span",{style:{fontWeight:700,color:"#dc2626"}},"Fail: "+failed)
      ):null
    ),
    // Add Cabinet
    h("div",{style:{background:"#fff",borderRadius:12,border:"1px solid #e5e7eb",boxShadow:"0 1px 2px rgba(0,0,0,.05)",padding:16,display:"flex",flexDirection:"column",gap:8}},
      h("p",{style:{fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:".05em"}},"Add Cabinet"),
      h("input",{className:"sg-input",placeholder:"Cabinet name...",value:cabName,onChange:function(e){setCabName(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")addCab();}}),
      h("input",{className:"sg-input",placeholder:"M.O. number (optional)...",value:cabMo,onChange:function(e){setCabMo(e.target.value);}}),
      h("button",{onClick:addCab,style:{background:ds.btn,color:"#fff",border:"none",borderRadius:8,padding:"8px 0",fontSize:14,cursor:"pointer",fontWeight:500}},"+ Add Cabinet")
    ),
    // Cabinet list
    deptCabs.length===0?h("p",{style:{textAlign:"center",color:"#9ca3af",padding:"32px 0",fontSize:14}},"No cabinets yet. Add one above."):null,
    h("div",{style:{display:"flex",flexDirection:"column",gap:12}},
      deptCabs.map(function(cab){
        return h(CabinetCard,{key:cab.id,cab:cab,dept:dept,people:db.people,assignments:db.assignments,onUpdate:updateCab,onDelete:deleteCab,onSendBack:sendBack});
      })
    ),
    // Modals
    modal==="people"?h(Modal,{title:dept+" — People",onClose:function(){setModal(null);}},
      h("div",{style:{display:"flex",flexDirection:"column",gap:16}},
        h("div",{style:{display:"flex",flexDirection:"column",gap:8}},
          h("input",{className:"sg-input",placeholder:"Full name...",value:newPerson,onChange:function(e){setNewPerson(e.target.value);}}),
          h("button",{onClick:addPerson,style:{background:ds.btn,color:"#fff",border:"none",borderRadius:8,padding:"8px 0",fontSize:14,cursor:"pointer"}},"Add Person")
        ),
        deptPeople.length===0?h("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:14,padding:"16px 0"}},"No people yet."):null,
        deptPeople.map(function(x){
          return h("div",{key:x.id,style:{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#f9fafb",borderRadius:8,padding:"8px 16px"}},
            h("p",{style:{fontSize:14,fontWeight:500}},x.name),
            h("button",{onClick:function(){removePerson(x.id);},style:{fontSize:12,color:"#f87171",background:"none",border:"none",cursor:"pointer"}},"Remove")
          );
        })
      )
    ):null,
    modal==="assign"?h(Modal,{title:dept+" — Assign Cabinets",onClose:function(){setModal(null);},wide:true},
      h("div",{style:{display:"flex",flexDirection:"column",gap:12}},
        deptCabs.length===0?h("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:14,padding:"24px 0"}},"No cabinets yet."):null,
        deptCabs.map(function(cab){
          return h("div",{key:cab.id,style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,background:"#f9fafb",borderRadius:8,padding:"10px 16px"}},
            h("span",{style:{fontSize:14,fontWeight:600}},cab.name,cab.moNumber?h("span",{style:{marginLeft:8,fontSize:12,color:"#9ca3af",fontFamily:"monospace"}},"M.O. "+cab.moNumber):null),
            h("select",{className:"sg-input",style:{width:"auto",minWidth:160,fontSize:13},value:assignLocal[cab.name]||"",onChange:function(e){var v=e.target.value;setAssignLocal(function(l){return Object.assign({},l,{[cab.name]:v});});}},
              h("option",{value:""},"Unassigned"),
              deptPeople.map(function(x){return h("option",{key:x.id,value:x.id},x.name);})
            )
          );
        }),
        h("div",{style:{display:"flex",gap:8,paddingTop:16}},
          h("button",{onClick:function(){saveAssign(assignLocal);},style:{flex:1,background:ds.btn,color:"#fff",border:"none",borderRadius:8,padding:"8px 0",fontSize:14,cursor:"pointer"}},"Save"),
          h("button",{onClick:function(){setModal(null);},style:{flex:1,border:"1px solid #e5e7eb",borderRadius:8,padding:"8px 0",fontSize:14,cursor:"pointer",color:"#4b5563",background:"#fff"}},"Cancel")
        )
      )
    ):null
  );
}

function App(){
  var ds=useState(null); var db=ds[0]; var setDb=ds[1];
  var at=useState("QC"); var activeTab=at[0]; var setActiveTab=at[1];
  var ts=useState([]); var toasts=ts[0]; var setToasts=ts[1];
  var tid=useRef(0);

  useEffect(function(){
    var stored=load("sg_data",null);
    if(stored){
      if(!stored.reworkLogs)stored.reworkLogs={};
      if(!stored.photos)stored.photos={};
      if(!stored.skids)stored.skids=[];
      if(!stored.bayAssignments)stored.bayAssignments={};
      setDb(stored);
    } else {
      var init=JSON.parse(JSON.stringify(SEED));
      save("sg_data",init);setDb(init);
    }
  },[]);

  var addToast=useCallback(function(t){
    var id=++tid.current;
    setToasts(function(ts2){return [{id:id,type:t.type||"info",title:t.title,body:t.body}].concat(ts2).slice(0,5);});
    setTimeout(function(){setToasts(function(ts2){return ts2.filter(function(x){return x.id!==id;});});},7000);
  },[]);

  function dismissToast(id){setToasts(function(ts2){return ts2.filter(function(x){return x.id!==id;});});}

  function handleReset(){
    if(confirm("Reset to demo data? This will erase ALL current data.")){
      var init=JSON.parse(JSON.stringify(SEED));save("sg_data",init);setDb(init);
    }
  }

  if(!db){
    return h("div",{style:{minHeight:"100vh",background:"#f9fafb",display:"flex",alignItems:"center",justifyContent:"center"}},
      h("div",{style:{textAlign:"center",color:"#9ca3af"}},
        h("p",{style:{fontSize:32,marginBottom:8}},"⚡"),
        h("p",{style:{fontSize:14}},"Loading SwitchGear...")
      )
    );
  }

  var cabinets=db.cabinets;
  var pipeline=PIPELINE.map(function(d){
    return {dept:d,total:cabinets.filter(function(c){return c.dept===d;}).length,comp:cabinets.filter(function(c){return c.dept===d&&c.status==="Complete";}).length};
  });

  return h("div",{style:{minHeight:"100vh",background:"#f9fafb"}},
    h(Toast,{toasts:toasts,onDismiss:dismissToast}),
    // Header
    h("div",{style:{background:"#111827",color:"#fff",padding:"16px",boxShadow:"0 1px 3px rgba(0,0,0,.1)"}},
      h("div",{style:{maxWidth:"64rem",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}},
        h("div",{style:{display:"flex",alignItems:"center",gap:12}},
          h("div",{style:{width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,#facc15,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 6px rgba(0,0,0,.1)"}},
            h("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},
              h("path",{d:"M13 2L4.5 13.5H11.5L10 22L20 10H13L13 2Z",fill:"white",stroke:"white",strokeWidth:1,strokeLinejoin:"round"})
            )
          ),
          h("div",null,
            h("h1",{style:{fontSize:20,fontWeight:700,letterSpacing:"-.025em"}},"SwitchGear"),
            h("p",{style:{fontSize:12,color:"#9ca3af",marginTop:2}},"Datacenter QA Tracking — Built by Josh McClellan @ Crusoe AI")
          )
        ),
        h("div",{style:{display:"flex",alignItems:"center",gap:12}},
          h("div",{style:{display:"flex",alignItems:"center",gap:8}},
            pipeline.map(function(s,i){
              return h("div",{key:s.dept,style:{display:"flex",alignItems:"center",gap:8}},
                h("div",{style:{textAlign:"center"}},
                  h("div",{style:{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:9999,background:DS[s.dept].badgeBg,color:DS[s.dept].badgeText}},s.dept),
                  h("div",{style:{fontSize:11,color:"#9ca3af",marginTop:2}},s.comp+"/"+s.total)
                ),
                i<pipeline.length-1?h("span",{style:{color:"#4b5563",fontSize:14}}," > "):null
              );
            }),
            h("span",{style:{color:"#4b5563",fontSize:14,marginLeft:4}}," > Done")
          ),
          h("button",{onClick:handleReset,style:{fontSize:12,color:"#6b7280",border:"1px solid #4b5563",borderRadius:8,padding:"4px 8px",background:"none",cursor:"pointer",opacity:.4}},"Reset Demo")
        )
      )
    ),
    // Tabs
    h("div",{style:{background:"#fff",borderBottom:"1px solid #e5e7eb",boxShadow:"0 1px 2px rgba(0,0,0,.05)"}},
      h("div",{style:{maxWidth:"64rem",margin:"0 auto",padding:"0 16px",display:"flex",gap:4,paddingTop:8}},
        DEPT_LIST.map(function(d){
          var tot=cabinets.filter(function(c){return c.dept===d;}).length;
          var comp2=cabinets.filter(function(c){return c.dept===d&&c.status==="Complete";}).length;
          var isRw=d==="Rework";
          var pend2=cabinets.filter(function(c){return c.dept===d&&c.status!=="Complete";}).length;
          var active=activeTab===d;
          return h("button",{key:d,onClick:function(){setActiveTab(d);},style:{padding:"10px 16px",fontSize:14,fontWeight:600,borderRadius:"8px 8px 0 0",borderBottom:active?"2px solid #3b82f6":"2px solid transparent",color:active?"#1f2937":"#6b7280",background:active?"#f9fafb":"transparent",cursor:"pointer",display:"flex",alignItems:"center",gap:8,border:"none",borderBottom:active?"2px solid #3b82f6":"2px solid transparent"}},
            d,
            h("span",{style:{fontSize:11,padding:"2px 6px",borderRadius:9999,background:DS[d].badgeBg,color:DS[d].badgeText}},isRw?pend2+" pending":comp2+"/"+tot)
          );
        })
      )
    ),
    // Content
    h("div",{style:{maxWidth:"64rem",margin:"0 auto",padding:"20px 16px"}},
      h(DeptView,{key:activeTab,dept:activeTab,db:db,setDb:setDb,onToast:addToast})
    )
  );
}

var root=ReactDOM.createRoot(document.getElementById("root"));
root.render(h(App,null));
</script>
</body>
</html>
