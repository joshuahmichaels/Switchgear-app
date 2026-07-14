import { useState, useEffect, useCallback, useRef } from "react";

async function load(key, fallback) {
  try { var r = await window.storage.get(key); return r ? JSON.parse(r.value) : fallback; } catch(e) { return fallback; }
}
async function save(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch(e) { console.error(e); }
}

var DEPT_LIST = ["QC","Test","UL","Rework"];
var DEPT_META = {
  QC:     {icon:"\uD83D\uDD0D", desc:"Quality Control"},
  Test:   {icon:"\u26A1",       desc:"Testing"},
  UL:     {icon:"\u2705",       desc:"UL Certification"},
  Rework: {icon:"\uD83D\uDD27", desc:"Rework / Repair"}
};
var DS = {
  QC:     {bg:"#eff6ff",border:"#bfdbfe",text:"#1e40af",btn:"#2563eb",badgeBg:"#dbeafe",badgeText:"#1e40af"},
  Test:   {bg:"#fefce8",border:"#fde68a",text:"#92400e",btn:"#d97706",badgeBg:"#fef9c3",badgeText:"#92400e"},
  UL:     {bg:"#faf5ff",border:"#d8b4fe",text:"#6b21a8",btn:"#7c3aed",badgeBg:"#ede9fe",badgeText:"#5b21b6"},
  Rework: {bg:"#fef2f2",border:"#fecaca",text:"#991b1b",btn:"#dc2626",badgeBg:"#fee2e2",badgeText:"#991b1b"}
};
var CAB_STATUSES = ["Pending","In Progress","Complete"];
var CAB_STATUS_COLORS = {
  "Pending":     "bg-gray-100 text-gray-600",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "Complete":    "bg-green-100 text-green-700"
};
var CAB_RESULT_COLORS = {
  "Pass": "bg-green-100 text-green-700",
  "Fail": "bg-red-100 text-red-700",
  "---":  "bg-gray-100 text-gray-400"
};
var NONE = "---";
var BR_STATUSES = ["In Service","Spare","Retired","Under Maintenance"];
var BR_STATUS_COLORS = {
  "In Service":       "bg-green-100 text-green-800",
  "Spare":            "bg-blue-100 text-blue-800",
  "Retired":          "bg-gray-100 text-gray-700",
  "Under Maintenance":"bg-yellow-100 text-yellow-800"
};
var PIPELINE = ["QC","Test","UL"];
var inp = "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

var ABB_MODULES = {
  "S200 Miniature":         ["S201","S202","S203","S204"],
  "S200M Miniature":        ["S201M","S202M","S203M","S204M"],
  "S280 High Performance":  ["S281","S282","S283","S284"],
  "DS200 Residual Current": ["DS201","DS202","DS203","DS204"],
  "T Max XT (Molded Case)": ["XT1","XT2","XT3","XT4","XT5","XT6","XT7"],
  "T Max T (Molded Case)":  ["T1","T2","T3","T4","T5","T6","T7","T8"],
  "Emax 2 (Air Circuit)":   ["E1.2","E2.2","E4.2","E6.2"],
  "Emax X1 (Air Circuit)":  ["X1","X1B","X1L","X1N"],
  "S700 (High Current MCB)":["S701","S702","S703"],
  "Formula (Molded Case)":  ["A1","A2","A3"]
};
var SIEMENS_MODULES = {
  "QP/QT Miniature (MCB)": ["Q115","Q120","Q130","Q140","Q150","Q160","Q2100","Q2200","Q3100","Q3200"],
  "BQ Bolt-On (MCB)":      ["BQ1B015","BQ1B020","BQ1B030","BQ2B020","BQ2B050","BQ2B100"],
  "HQP HACR (MCB)":        ["HQP115","HQP120","HQP130","HQP215","HQP220","HQP320"],
  "BL / BLH (Molded Case)":["BL020","BL060","BL100","BLH020","BLH100"],
  "FD / FXD (Molded Case)":["FD62B100","FD63B150","FD63B200","FXD63B250","FXD63B400"],
  "JD / JXD (Molded Case)":["JD62F225","JD63F400","JXD63B400","JXD63B600"],
  "LD / LXD (Molded Case)":["LD63B600","LD63B800","LXD63B1000","LXD63B1200"],
  "WL (Air Circuit)":      ["WL1-630","WL1-1000","WL1-1600","WL2-2000","WL2-3200","WL3-4000"]
};
var FRAME_INFO = {
  "S200 Miniature":         "IEC 60898-1 up to 63A",
  "S200M Miniature":        "IEC 60898-1 up to 63A",
  "S280 High Performance":  "IEC 60898-1 up to 80A",
  "DS200 Residual Current": "RCCB/GFCI IEC 61008",
  "T Max XT (Molded Case)": "IEC 60947-2 up to 1600A",
  "T Max T (Molded Case)":  "IEC 60947-2 up to 3200A",
  "Emax 2 (Air Circuit)":   "IEC 60947-2 up to 6300A",
  "Emax X1 (Air Circuit)":  "IEC 60947-2 up to 1600A",
  "S700 (High Current MCB)":"IEC 60898 up to 125A",
  "Formula (Molded Case)":  "IEC 60947-2 up to 250A",
  "QP/QT Miniature (MCB)":  "UL 489 up to 200A",
  "BQ Bolt-On (MCB)":       "UL 489 up to 100A",
  "HQP HACR (MCB)":         "UL 489 up to 30A",
  "BL / BLH (Molded Case)": "UL 489 up to 100A",
  "FD / FXD (Molded Case)": "UL 489 up to 400A",
  "JD / JXD (Molded Case)": "UL 489 up to 600A",
  "LD / LXD (Molded Case)": "UL 489 up to 1200A",
  "WL (Air Circuit)":       "UL 1066 up to 4000A"
};

var SEED_DATA = {
  breakers: [
    {id:"b1",serial:"SN-10042",model:"XT1",manufacturer:"ABB",frameType:"T Max XT (Molded Case)",location:"Panel A - Bay 1",status:"In Service",voltage:"120V",amperage:"20A",installDate:"2022-03-15",lastInspection:"2024-11-01",notes:""},
    {id:"b2",serial:"SN-10087",model:"E2.2",manufacturer:"ABB",frameType:"Emax 2 (Air Circuit)",location:"Panel B - Bay 3",status:"Under Maintenance",voltage:"240V",amperage:"30A",installDate:"2021-07-20",lastInspection:"2025-01-15",notes:""},
    {id:"b3",serial:"SN-10055",model:"XT3",manufacturer:"ABB",frameType:"T Max XT (Molded Case)",location:"Panel A - Bay 5",status:"Spare",voltage:"240V",amperage:"100A",installDate:"",lastInspection:"",notes:""},
    {id:"b4",serial:"SN-10091",model:"Q2100",manufacturer:"Siemens",frameType:"QP/QT Miniature (MCB)",location:"Panel C - Bay 2",status:"In Service",voltage:"120V",amperage:"20A",installDate:"2023-06-10",lastInspection:"2025-02-20",notes:""}
  ],
  cabinets: [
    {id:"c1",name:"Panel A",moNumber:"",dept:"QC",status:"In Progress",result:NONE,notes:"",breakerIds:[]},
    {id:"c2",name:"Panel B",moNumber:"",dept:"QC",status:"Pending",result:NONE,notes:"",breakerIds:[]},
    {id:"c3",name:"Panel A",moNumber:"",dept:"Test",status:"Pending",result:NONE,notes:"",breakerIds:[]},
    {id:"c4",name:"Panel C",moNumber:"",dept:"UL",status:"Complete",result:"Pass",notes:"",breakerIds:[]}
  ],
  people: [],
  movements: [],
  logs: {},
  photos: {},
  reworkLogs: {},
  assignments: {QC:{},Test:{},UL:{},Rework:{}},
  skids: [],
  bayAssignments: {}
};

function getResult(cab) { return cab.result || NONE; }

function extractCabinet(loc) {
  if (!loc) return null;
  return loc.split(/[-,]/)[0].trim() || null;
}

function makeCab(id, name, mo, dept, carry) {
  var base = {id:id, name:name, moNumber:mo||"", dept:dept, status:"Pending", result:NONE, notes:"", breakerIds:[]};
  if (carry) {
    if (carry.reworkCount) base.reworkCount = carry.reworkCount;
    if (carry.notes) base.notes = carry.notes;
    if (carry.breakerIds && carry.breakerIds.length) base.breakerIds = carry.breakerIds.slice();
    if (carry.transRepair) { base.transRepair = true; base.pairId = carry.pairId; base.pairLabel = carry.pairLabel; }
  }
  return base;
}

function statusColor(status) { return CAB_STATUS_COLORS[status] || "bg-gray-100 text-gray-600"; }
function resultColor(result) { return CAB_RESULT_COLORS[result] || "bg-gray-100 text-gray-400"; }

function Field(p) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{p.label}</label>
      {p.children}
    </div>
  );
}

function Modal(p) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className={"bg-white rounded-xl shadow-2xl w-full max-h-screen overflow-y-auto " + (p.wide ? "max-w-2xl" : "max-w-lg")}>
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-gray-800">{p.title}</h2>
          <button onClick={p.onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="px-6 py-4">{p.children}</div>
      </div>
    </div>
  );
}

function Toast(p) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {p.toasts.map(function(t) {
        var bg = t.type === "fail" ? "bg-red-600" : "bg-blue-600";
        return (
          <div key={t.id} className={"flex items-start gap-3 rounded-xl shadow-lg px-4 py-3 text-white " + bg}>
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="text-xs opacity-80 mt-0.5">{t.body}</p>
            </div>
            <button onClick={function(){p.onDismiss(t.id);}} className="opacity-60 hover:opacity-100 text-lg leading-none">&times;</button>
          </div>
        );
      })}
    </div>
  );
}

function BreakerForm(p) {
  var empty = {serial:"",model:"",manufacturer:"ABB",frameType:"",location:"",status:"In Service",voltage:"",amperage:"",installDate:"",lastInspection:"",notes:""};
  var [f, setF] = useState(Object.assign({}, empty, p.initial || {}));
  function sf(k,v) { setF(function(prev){return Object.assign({},prev,{[k]:v});}); }
  var isSie = f.manufacturer === "Siemens";
  var frames = Object.keys(isSie ? SIEMENS_MODULES : ABB_MODULES);
  var mods = f.frameType ? ((isSie ? SIEMENS_MODULES : ABB_MODULES)[f.frameType] || []) : [];
  function handleSave() { if (f.serial.trim()) p.onSave(f); }
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={function(){sf("manufacturer","ABB");sf("frameType","");sf("model","");}}
          className={"flex-1 py-2 rounded-lg text-sm font-bold border-2 " + (f.manufacturer==="ABB" ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-400 border-gray-200")}>
          ABB
        </button>
        <button onClick={function(){sf("manufacturer","Siemens");sf("frameType","");sf("model","");}}
          className={"flex-1 py-2 rounded-lg text-sm font-bold border-2 " + (f.manufacturer==="Siemens" ? "bg-blue-700 text-white border-blue-700" : "bg-white text-gray-400 border-gray-200")}>
          Siemens
        </button>
      </div>
      <Field label="Serial Number *"><input className={inp} value={f.serial} onChange={function(e){sf("serial",e.target.value);}} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Frame / Series">
          <select className={inp} value={f.frameType||""} onChange={function(e){sf("frameType",e.target.value);sf("model","");}}>
            <option value="">Select Frame</option>
            {frames.map(function(fr){return <option key={fr}>{fr}</option>;})}
          </select>
        </Field>
        <Field label="Module / Model">
          <select className={inp} value={f.model} onChange={function(e){sf("model",e.target.value);}} disabled={!f.frameType}>
            <option value="">Select Module</option>
            {mods.map(function(m){return <option key={m}>{m}</option>;})}
          </select>
        </Field>
      </div>
      {f.frameType && FRAME_INFO[f.frameType] ? <p className="text-xs text-gray-500 bg-gray-50 rounded px-3 py-2">{FRAME_INFO[f.frameType]}</p> : null}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Voltage"><input className={inp} value={f.voltage} onChange={function(e){sf("voltage",e.target.value);}} /></Field>
        <Field label="Amperage"><input className={inp} value={f.amperage} onChange={function(e){sf("amperage",e.target.value);}} /></Field>
      </div>
      <Field label="Location"><input className={inp} value={f.location} onChange={function(e){sf("location",e.target.value);}} /></Field>
      <Field label="Status">
        <select className={inp} value={f.status} onChange={function(e){sf("status",e.target.value);}}>
          {BR_STATUSES.map(function(st){return <option key={st}>{st}</option>;})}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Install Date"><input type="date" className={inp} value={f.installDate} onChange={function(e){sf("installDate",e.target.value);}} /></Field>
        <Field label="Last Inspection"><input type="date" className={inp} value={f.lastInspection} onChange={function(e){sf("lastInspection",e.target.value);}} /></Field>
      </div>
      <Field label="Notes"><textarea rows={2} className={inp} value={f.notes} onChange={function(e){sf("notes",e.target.value);}} /></Field>
      <div className="flex gap-2">
        <button onClick={handleSave} className={"flex-1 text-white rounded-lg py-2 text-sm font-medium " + (isSie ? "bg-blue-700" : "bg-red-600")}>Save</button>
        <button onClick={p.onCancel} className="flex-1 border rounded-lg py-2 text-sm text-gray-600">Cancel</button>
      </div>
    </div>
  );
}

function LogsModal(p) {
  var today = new Date().toISOString().slice(0,10);
  var [adding, setAdding] = useState(false);
  var [f, setF] = useState({date:today,technician:"",work:"",parts:"",nextService:""});
  function sf(k,v){setF(function(prev){return Object.assign({},prev,{[k]:v});});}
  function handleAdd() {
    if (f.date && f.technician && f.work) {
      p.onSave(p.bId,f);
      setAdding(false);
      setF({date:today,technician:"",work:"",parts:"",nextService:""});
    }
  }
  var myLogs = (p.logs[p.bId]||[]).slice().sort(function(a,b){return b.date.localeCompare(a.date);});
  if (adding) {
    return (
      <Modal title={"Maintenance - " + p.bSerial} onClose={p.onClose} wide>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date *"><input type="date" className={inp} value={f.date} onChange={function(e){sf("date",e.target.value);}} /></Field>
            <Field label="Technician *"><input className={inp} value={f.technician} onChange={function(e){sf("technician",e.target.value);}} /></Field>
          </div>
          <Field label="Work Performed *"><textarea rows={3} className={inp} value={f.work} onChange={function(e){sf("work",e.target.value);}} /></Field>
          <Field label="Parts Replaced"><input className={inp} value={f.parts} onChange={function(e){sf("parts",e.target.value);}} /></Field>
          <Field label="Next Service"><input type="date" className={inp} value={f.nextService} onChange={function(e){sf("nextService",e.target.value);}} /></Field>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm">Add Entry</button>
            <button onClick={function(){setAdding(false);}} className="flex-1 border rounded-lg py-2 text-sm text-gray-600">Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal title={"Maintenance - " + p.bSerial} onClose={p.onClose} wide>
      <button onClick={function(){setAdding(true);}} className="mb-4 w-full bg-blue-600 text-white rounded-lg py-2 text-sm">+ Add Log Entry</button>
      {myLogs.length === 0 ? <p className="text-center text-gray-400 py-8 text-sm">No logs yet.</p> : null}
      {myLogs.map(function(lg) {
        var overdue = lg.nextService && new Date(lg.nextService) < new Date();
        return (
          <div key={lg.id} className="border rounded-xl p-4 mb-3 bg-gray-50 space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-sm">{lg.date + " - " + lg.technician}</span>
              <button onClick={function(){p.onDelete(p.bId,lg.id);}} className="text-red-400 text-xs">Delete</button>
            </div>
            <p className="text-sm text-gray-700"><span className="font-medium text-gray-500">Work: </span>{lg.work}</p>
            {lg.parts ? <p className="text-sm text-gray-700"><span className="font-medium text-gray-500">Parts: </span>{lg.parts}</p> : null}
            {lg.nextService ? <p className="text-sm"><span className="font-medium text-gray-500">Next: </span><span className={overdue ? "text-red-600 font-semibold" : "text-green-700"}>{lg.nextService}</span></p> : null}
          </div>
        );
      })}
    </Modal>
  );
}

function PhotosModal(p) {
  var [uploading, setUploading] = useState(false);
  var [preview, setPreview] = useState(null);
  var fileRef = useRef(null);
  var myPhotos = (p.photos[p.cab.id]||[]).slice().sort(function(a,b){return b.ts-a.ts;});
  async function handleFiles(files) {
    setUploading(true);
    for (var i=0;i<files.length;i++) {
      if (!files[i].type.startsWith("image/")) continue;
      await new Promise(function(res) {
        var reader = new FileReader();
        reader.onload = function(e){p.onAdd(p.cab.id,{id:Date.now()+"_"+i,name:files[i].name,data:e.target.result,ts:Date.now()});res();};
        reader.readAsDataURL(files[i]);
      });
    }
    setUploading(false);
  }
  if (preview) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4" onClick={function(){setPreview(null);}}>
        <img src={preview} className="max-w-full max-h-full rounded-xl object-contain" alt="preview" />
      </div>
    );
  }
  return (
    <Modal title={"Photos - " + p.cab.name} onClose={p.onClose} wide>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50"
        onClick={function(){if(fileRef.current)fileRef.current.click();}}
        onDragOver={function(e){e.preventDefault();}}
        onDrop={function(e){e.preventDefault();handleFiles(e.dataTransfer.files);}}>
        <p className="text-sm font-medium text-gray-600">Click or drag photos here</p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP</p>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={function(e){handleFiles(e.target.files);}} />
      </div>
      {uploading ? <p className="text-center text-blue-600 text-sm mb-3">Uploading...</p> : null}
      {myPhotos.length===0 && !uploading ? <p className="text-center text-gray-400 py-4 text-sm">No photos yet.</p> : null}
      <div className="grid grid-cols-2 gap-3">
        {myPhotos.map(function(ph) {
          return (
            <div key={ph.id} className="rounded-xl overflow-hidden border border-gray-200">
              <img src={ph.data} alt={ph.name} className="w-full h-36 object-cover cursor-pointer hover:opacity-90" onClick={function(){setPreview(ph.data);}} />
              <div className="px-2 py-1 bg-white flex items-center justify-between">
                <span className="text-xs text-gray-500 truncate" style={{maxWidth:"110px"}}>{ph.name}</span>
                <button onClick={function(){p.onDelete(p.cab.id,ph.id);}} className="text-red-400 text-xs ml-1">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

function ReworkModal(p) {
  var today = new Date().toISOString().slice(0,10);
  var [adding, setAdding] = useState(false);
  var [f, setF] = useState({issue:"",technician:"",dateSent:today,dateReturned:""});
  function sf(k,v){setF(function(prev){return Object.assign({},prev,{[k]:v});});}
  function handleSave() {
    if (f.issue && f.dateSent) {
      p.onSave(p.cab.id,f);
      setAdding(false);
      setF({issue:"",technician:"",dateSent:today,dateReturned:""});
    }
  }
  var myLogs = (p.reworkLogs[p.cab.name]||[]).slice().sort(function(a,b){return b.dateSent.localeCompare(a.dateSent);});
  if (adding) {
    return (
      <Modal title={"Rework Log - " + p.cab.name} onClose={p.onClose} wide>
        <div className="space-y-3">
          <Field label="Issue *"><textarea rows={3} className={inp} value={f.issue} onChange={function(e){sf("issue",e.target.value);}} placeholder="Describe the issue..." /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Technician"><input className={inp} value={f.technician} onChange={function(e){sf("technician",e.target.value);}} /></Field>
            <Field label="Date Sent"><input type="date" className={inp} value={f.dateSent} onChange={function(e){sf("dateSent",e.target.value);}} /></Field>
          </div>
          <Field label="Date Returned"><input type="date" className={inp} value={f.dateReturned} onChange={function(e){sf("dateReturned",e.target.value);}} /></Field>
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm">Save Entry</button>
            <button onClick={function(){setAdding(false);}} className="flex-1 border rounded-lg py-2 text-sm text-gray-600">Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal title={"Rework Log - " + p.cab.name} onClose={p.onClose} wide>
      <button onClick={function(){setAdding(true);}} className="mb-4 w-full bg-red-600 text-white rounded-lg py-2 text-sm">+ Add Rework Entry</button>
      {myLogs.length===0 ? <p className="text-center text-gray-400 py-6 text-sm">No rework entries yet.</p> : null}
      {myLogs.map(function(lg) {
        var retBadge = lg.dateReturned
          ? <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{"Returned: " + lg.dateReturned}</span>
          : <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Pending Return</span>;
        var markBtn = lg.dateReturned ? null : (
          <button onClick={function(){p.onMarkReturned(p.cab.id,lg.id);}} className="text-xs text-green-700 border border-green-300 rounded px-3 py-1 hover:bg-green-50">Mark Returned</button>
        );
        return (
          <div key={lg.id} className="border border-red-100 rounded-xl p-4 mb-3 bg-red-50 space-y-1">
            <div className="flex justify-between items-start">
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">{"Sent: " + lg.dateSent}</span>
                {retBadge}
              </div>
              <button onClick={function(){p.onDelete(p.cab.id,lg.id);}} className="text-red-400 text-xs">Delete</button>
            </div>
            <p className="text-sm text-gray-800"><span className="font-medium text-gray-500">Issue: </span>{lg.issue}</p>
            {lg.technician ? <p className="text-sm text-gray-700"><span className="font-medium text-gray-500">Tech: </span>{lg.technician}</p> : null}
            {markBtn}
          </div>
        );
      })}
    </Modal>
  );
}

function SendBackModal(p) {
  var [target, setTarget] = useState(p.defaultDept||"QC");
  function handleConfirm(){p.onConfirm(target);p.onClose();}
  return (
    <Modal title={"Send Back - " + p.cab.name} onClose={p.onClose}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Select the department to send this cabinet back to. History and rework count will be carried over.</p>
        <Field label="Send back to department">
          <div className="flex gap-2">
            {PIPELINE.map(function(d) {
              var isActive = target===d;
              var ds2 = DS[d];
              return (
                <button key={d} onClick={function(){setTarget(d);}}
                  className="flex-1 py-2 rounded-lg text-sm font-bold border-2 transition"
                  style={isActive ? {background:ds2.btn,color:"#fff",borderColor:ds2.btn} : {background:"#fff",color:"#6b7280",borderColor:"#e5e7eb"}}>
                  {d}
                </button>
              );
            })}
          </div>
        </Field>
        {p.defaultDept && target !== p.defaultDept ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-700">
            {"Default is " + p.defaultDept + " (where it failed). Overriding to " + target + "."}
          </div>
        ) : null}
        <div className="flex gap-2 pt-1">
          <button onClick={handleConfirm} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Confirm and Send Back</button>
          <button onClick={p.onClose} className="flex-1 border rounded-lg py-2 text-sm text-gray-600">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

function NotesModal(p) {
  var [notes, setNotes] = useState(p.cab.notes||"");
  function handleSave(){p.onSave(p.cab.id,{notes:notes});p.onClose();}
  return (
    <Modal title={"Notes - " + p.cab.name} onClose={p.onClose}>
      <div className="space-y-3">
        <textarea className={inp} rows={6} placeholder="Add notes about this cabinet..." value={notes} onChange={function(e){setNotes(e.target.value);}} />
        <div className="flex gap-2">
          <button onClick={handleSave} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Save Notes</button>
          <button onClick={p.onClose} className="flex-1 border rounded-lg py-2 text-sm text-gray-600">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

function BreakerAssignModal(p) {
  var [local, setLocal] = useState((p.cab.breakerIds||[]).slice());
  var [search, setSearch] = useState("");
  function toggle(bid){setLocal(function(prev){return prev.indexOf(bid)>=0?prev.filter(function(id){return id!==bid;}):prev.concat([bid]);});}
  function handleSave(){p.onSave(p.cab.id,{breakerIds:local});p.onClose();}
  var filtered = p.breakers.filter(function(b){
    var q=search.toLowerCase();
    if(!q)return true;
    return [b.serial,b.model,b.frameType,b.manufacturer,b.location].some(function(v){return v&&v.toLowerCase().indexOf(q)>=0;});
  });
  return (
    <Modal title={"Assign Breakers - " + p.cab.name} onClose={p.onClose} wide>
      <p className="text-xs text-gray-500 mb-2">Select breakers to assign to this cabinet.</p>
      <input className={inp+" mb-3"} placeholder="Search..." value={search} onChange={function(e){setSearch(e.target.value);}} />
      {filtered.length===0 ? <p className="text-center text-gray-400 py-6 text-sm">No breakers found.</p> : (
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {filtered.map(function(b){
            var isAssigned=local.indexOf(b.id)>=0;
            var ft=b.frameType||"";
            var mfrCls=b.manufacturer==="Siemens"?"bg-blue-100 text-blue-800":"bg-red-100 text-red-700";
            return (
              <button key={b.id} onClick={function(){toggle(b.id);}}
                className={"w-full text-left px-4 py-3 rounded-xl border-2 transition "+(isAssigned?"border-blue-500 bg-blue-50":"border-gray-200 bg-white hover:border-gray-300")}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-mono font-semibold text-sm text-blue-700">{b.serial}</span>
                      <span className={"text-xs font-bold px-1.5 py-0.5 rounded-full "+mfrCls}>{b.manufacturer||"ABB"}</span>
                      {ft.toLowerCase().indexOf("t max")>=0?<span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700">T Max</span>:null}
                      {ft.toLowerCase().indexOf("emax")>=0?<span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Emax</span>:null}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{(b.model||"---")+" / "+(b.frameType||"---")+(b.location?" / "+b.location:"")}</p>
                  </div>
                  {isAssigned?<span className="text-sm font-bold text-blue-500">done</span>:<span className="text-sm font-bold text-gray-300">+</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}
      <div className="flex gap-2 pt-4">
        <button onClick={handleSave} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Save</button>
        <button onClick={p.onClose} className="flex-1 border rounded-lg py-2 text-sm text-gray-600">Cancel</button>
      </div>
    </Modal>
  );
}

function ExportModal(p) {
  var todayStr=new Date().toISOString().slice(0,10);
  var deptCabs=p.db.cabinets.filter(function(c){return c.dept===p.dept;});
  var deptAssign=p.db.assignments[p.dept]||{};
  var personMap={};
  p.db.people.filter(function(x){return x.dept===p.dept;}).forEach(function(x){personMap[x.id]=x.name;});
  var total=deptCabs.length||1;
  var comp=deptCabs.filter(function(c){return c.status==="Complete";}).length;
  var ip=deptCabs.filter(function(c){return c.status==="In Progress";}).length;
  var pend=deptCabs.filter(function(c){return c.status==="Pending";}).length;
  var passed=deptCabs.filter(function(c){return c.result==="Pass";}).length;
  var failed=deptCabs.filter(function(c){return c.result==="Fail";}).length;
  var todayMoves=p.db.movements.filter(function(m){return m.dept===p.dept&&m.timestamp&&m.timestamp.slice(0,10)===todayStr;});
  var [copied,setCopied]=useState(false);
  function handleCopy(){
    var lines=[
      "SWITCHCORE - "+p.dept+" SUMMARY","Generated: "+new Date().toLocaleString(),"",
      "=== PIPELINE ===",
      "Complete: "+comp+"/"+total+" ("+Math.round(comp/total*100)+"%)",
      "In Progress: "+ip+"/"+total+" ("+Math.round(ip/total*100)+"%)",
      "Pending: "+pend+"/"+total+" ("+Math.round(pend/total*100)+"%)",
      "Pass: "+passed+" | Fail: "+failed,"",
      "=== CABINETS ===","Cabinet,M.O.,Status,Result,Assigned To"
    ].concat(deptCabs.map(function(c){
      var pn=(deptAssign[c.name]&&personMap[deptAssign[c.name]])||"Unassigned";
      return '"'+c.name+'","'+(c.moNumber||"")+'","'+c.status+'","'+(c.result||"---")+'","'+pn+'"';
    })).concat(["","=== TODAY MOVEMENTS ===","Time,Direction,Cabinet,Bay,Tech,Notes"]).concat(
      todayMoves.length>0?todayMoves.map(function(m){return '"'+(m.timestamp?m.timestamp.slice(11,16):"")+'","'+m.direction+'","'+m.cabinet+'","'+m.bay+'","'+(m.technician||"")+'","'+(m.notes||"")+'"';})
      :["(No movements today)"]
    );
    navigator.clipboard.writeText(lines.join("\n")).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2000);});
  }
  return (
    <Modal title={"Export - "+p.dept+" - "+todayStr} onClose={p.onClose} wide>
      <p className="text-xs text-gray-500 mb-3">Copy and paste into Excel or Google Sheets.</p>
      <button onClick={handleCopy} className={"w-full rounded-lg py-2 text-sm font-medium mb-3 "+(copied?"bg-green-600 text-white":"bg-blue-600 text-white")}>{copied?"Copied!":"Copy to Clipboard"}</button>
    </Modal>
  );
}

function MoEdit(p) {
  var [editing,setEditing]=useState(false);
  var [val,setVal]=useState(p.cab.moNumber||"");
  function handleSave(){p.onSave(p.cab.id,{moNumber:val});setEditing(false);}
  if(editing){
    return (
      <div className="flex items-center gap-2 mt-1">
        <input className="border rounded px-2 py-0.5 text-xs w-36 font-mono focus:outline-none focus:ring-1 focus:ring-blue-400" value={val} onChange={function(e){setVal(e.target.value);}} autoFocus />
        <button onClick={handleSave} className="text-xs text-blue-600 font-medium">Save</button>
        <button onClick={function(){setEditing(false);setVal(p.cab.moNumber||"");}} className="text-xs text-gray-400">Cancel</button>
      </div>
    );
  }
  return (
    <button onClick={function(){setEditing(true);}} className="text-xs text-blue-500 hover:text-blue-700 mt-1">
      {p.cab.moNumber ? "Edit M.O." : "+ Add M.O. number"}
    </button>
  );
}

function SkidNumberEdit(p) {
  var [editing,setEditing]=useState(false);
  var [val,setVal]=useState(p.skid.skidNumber||"");
  function handleSave(){p.onSave(p.skid.id,{skidNumber:val});setEditing(false);}
  if(editing){
    return (
      <div className="flex items-center gap-2 mt-1">
        <input className="border rounded px-2 py-0.5 text-xs w-36 font-mono focus:outline-none focus:ring-1 focus:ring-blue-400" value={val} onChange={function(e){setVal(e.target.value);}} autoFocus />
        <button onClick={handleSave} className="text-xs text-blue-600 font-medium">Save</button>
        <button onClick={function(){setEditing(false);setVal(p.skid.skidNumber||"");}} className="text-xs text-gray-400">Cancel</button>
      </div>
    );
  }
  return (
    <button onClick={function(){setEditing(true);}} className="text-xs text-blue-500 hover:text-blue-700 mt-1">
      {p.skid.skidNumber ? "Edit skid #" : "+ Add skid number"}
    </button>
  );
}

function SkidCabinetAssign(p) {
  var [search,setSearch]=useState("");
  var filtered=(function(){
    var seen={};
    return p.deptCabs.filter(function(c){
      if(seen[c.name])return false;
      seen[c.name]=true;
      var q=search.toLowerCase();
      if(!q)return true;
      return (c.name&&c.name.toLowerCase().indexOf(q)>=0)||(c.moNumber&&c.moNumber.toLowerCase().indexOf(q)>=0);
    });
  })();
  return (
    <div>
      <input className={inp+" mb-2"} placeholder="Search cabinets..." value={search} onChange={function(e){setSearch(e.target.value);}} />
      {filtered.length===0?<p className="text-xs text-gray-400 py-2">No cabinets found.</p>:(
        <div className="grid grid-cols-2 gap-2">
          {filtered.map(function(cab){
            var assigned=(p.skid.cabinets||[]).indexOf(cab.name)>=0;
            return (
              <button key={cab.id} onClick={function(){p.onToggle(p.skid.id,cab.name);}}
                className={"text-xs px-3 py-2 rounded-lg border-2 text-left transition font-medium "+(assigned?"border-blue-500 bg-blue-50 text-blue-700":"border-gray-200 bg-white text-gray-600 hover:border-gray-300")}>
                <span>{cab.name}</span>
                {cab.moNumber?<span className="block font-mono text-gray-400">{"M.O. "+cab.moNumber}</span>:null}
                <span className={"block text-xs mt-0.5 "+(assigned?"text-blue-500":"text-gray-400")}>{assigned?"Assigned":"+ Add to skid"}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UnitPanel(p) {
  var cab=p.cab;
  var dept=p.dept;
  var result=getResult(cab);
  var deptAssign=p.assignments[dept]||{};
  var personMap={};
  p.people.filter(function(x){return x.dept===dept;}).forEach(function(x){personMap[x.id]=x.name;});
  var pname=deptAssign[cab.name]?personMap[deptAssign[cab.name]]:null;
  var assignedBreakers=p.breakers.filter(function(b){return (cab.breakerIds||[]).indexOf(b.id)>=0;});
  var [showNotes,setShowNotes]=useState(false);
  var [showBkr,setShowBkr]=useState(false);
  var [showRework,setShowRework]=useState(false);
  var [showPhotos,setShowPhotos]=useState(false);
  var [showSendBack,setShowSendBack]=useState(false);
  var [tech,setTech]=useState("");
  var borderColor=result==="Fail"?"#fca5a5":result==="Pass"?"#86efac":"#e5e7eb";
  return (
    <div className="flex-1 min-w-0 rounded-xl p-3 border-2" style={{borderColor:borderColor}}>
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <span className="font-semibold text-gray-800 text-sm">{cab.name}</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">{cab.pairLabel||"Unit"}</span>
        {cab.moNumber?<span className="text-xs font-mono px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{"M.O. "+cab.moNumber}</span>:null}
        {pname?<span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{"@ "+pname}</span>:null}
      </div>
      <div className="flex items-center gap-1 flex-wrap mb-2">
        <span className={"text-xs font-medium px-2 py-0.5 rounded-full "+statusColor(cab.status)}>{cab.status}</span>
        <span className={"text-xs font-bold px-2 py-0.5 rounded-full "+resultColor(result)}>{result===NONE?"No Result":result}</span>
        {(cab.reworkCount||0)>0?<span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">{"Rework x"+cab.reworkCount}</span>:null}
      </div>
      {cab.notes?<p className="text-xs text-gray-500 italic mb-2">{cab.notes}</p>:null}
      <div className="flex flex-col gap-1">
        {dept!=="Rework"?(
          <select value={tech} onChange={function(e){setTech(e.target.value);}} className="border rounded px-2 py-1 text-xs bg-white w-full">
            <option value="">Technician...</option>
            {p.people.filter(function(x){return x.dept===dept;}).map(function(x){return <option key={x.id} value={x.name}>{x.name}</option>;})}
          </select>
        ):null}
        <select value={cab.status} onChange={function(e){p.onUpdate(cab.id,{status:e.target.value},e.target.value==="Complete"?tech:null);}} className="border rounded px-2 py-1 text-xs bg-white w-full">
          {CAB_STATUSES.map(function(st){return <option key={st}>{st}</option>;})}
        </select>
        {dept!=="Rework"?(
          <div className="flex rounded overflow-hidden border text-xs font-bold">
            <button onClick={function(){p.onUpdate(cab.id,{result:result==="Pass"?NONE:"Pass"});}} className={"flex-1 px-2 py-1 "+(result==="Pass"?"bg-green-500 text-white":"bg-white text-gray-400")}>Pass</button>
            <button onClick={function(){p.onUpdate(cab.id,{result:result==="Fail"?NONE:"Fail"});}} className={"flex-1 px-2 py-1 "+(result==="Fail"?"bg-red-500 text-white":"bg-white text-gray-400")}>Fail</button>
          </div>
        ):null}
        <div className="flex gap-1 flex-wrap">
          <button onClick={function(){setShowBkr(true);}} className={"text-xs border rounded px-2 py-1 "+(assignedBreakers.length>0?"border-blue-400 text-blue-600":"border-gray-300 text-gray-600")}>{"Bkr "+(assignedBreakers.length>0?assignedBreakers.length:"")}</button>
          <button onClick={function(){setShowRework(true);}} className="text-xs border border-red-300 text-red-600 rounded px-2 py-1">Rework</button>
          <button onClick={function(){setShowPhotos(true);}} className="text-xs border border-gray-300 text-gray-600 rounded px-2 py-1">Photos</button>
          <button onClick={function(){setShowNotes(true);}} className={"text-xs border rounded px-2 py-1 "+(cab.notes?"border-yellow-400 text-yellow-600":"border-gray-300 text-gray-600")}>Notes</button>
          {dept==="Rework"?<button onClick={function(){setShowSendBack(true);}} className="text-xs font-semibold px-3 py-1 rounded border-2 border-blue-400 text-blue-700">Send Back</button>:null}
          <button onClick={function(){p.onDelete(cab.id);}} className="text-red-400 text-xs border border-red-200 rounded px-2 py-1">Del</button>
          <button onClick={function(){p.onDeleteAll(cab.name);}} className="text-red-600 text-xs border border-red-300 rounded px-2 py-1">Del All</button>
        </div>
      </div>
      {showBkr?<BreakerAssignModal cab={cab} breakers={p.breakers} onSave={p.onUpdate} onClose={function(){setShowBkr(false);}} />:null}
      {showRework?<ReworkModal cab={cab} reworkLogs={p.reworkLogs} onSave={p.onReworkSave} onDelete={p.onReworkDelete} onMarkReturned={p.onReworkReturned} onClose={function(){setShowRework(false);}} />:null}
      {showPhotos?<PhotosModal cab={cab} photos={p.photos} onAdd={p.onPhotoAdd} onDelete={p.onPhotoDelete} onClose={function(){setShowPhotos(false);}} />:null}
      {showNotes?<NotesModal cab={cab} onSave={p.onUpdate} onClose={function(){setShowNotes(false);}} />:null}
      {showSendBack?<SendBackModal cab={cab} defaultDept={cab.originDept||"QC"} onConfirm={function(t){p.onSendBack(cab,t);}} onClose={function(){setShowSendBack(false);}} />:null}
    </div>
  );
}

function TransRepairCard(p) {
  var dept=p.dept;
  var uA=p.unitA;
  var uB=p.unitB;
  var dIdx=PIPELINE.indexOf(dept);
  var pipeBar=dept!=="Rework"?(
    <div className="px-4 pb-3">
      <div className="flex items-center gap-1">
        {PIPELINE.map(function(d,i){
          var filled=i<dIdx||(i===dIdx&&uA.status!=="Pending"&&uB.status!=="Pending");
          var active=i===dIdx;
          var bc=(getResult(uA)==="Fail"||getResult(uB)==="Fail")&&active?"#f87171":filled?"#4ade80":(active&&(uA.status==="In Progress"||uB.status==="In Progress"))?"#fbbf24":"#e5e7eb";
          return (
            <div key={d} className="flex items-center gap-1 flex-1">
              <div className="flex-1 h-1.5 rounded-full" style={{background:bc}} />
              <span className={"text-xs font-semibold px-1 rounded "+(active?"ring-2 ring-blue-400 ":"")+(filled?"text-green-700":"text-gray-400")}>{d}</span>
            </div>
          );
        })}
        <div className="ml-1 h-1.5 w-4 rounded-full" style={{background:dept==="UL"&&uA.status==="Complete"&&uB.status==="Complete"&&getResult(uA)==="Pass"&&getResult(uB)==="Pass"?"#4ade80":"#e5e7eb"}} />
      </div>
    </div>
  ):null;
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-teal-200 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b" style={{background:"#f0fdfa"}}>
        <span className="text-sm font-bold text-teal-700">Pair</span>
        <span className="text-xs font-mono text-teal-600">{p.pairId}</span>
        <button onClick={function(){p.onDeletePair(uA.id,uB.id);}} className="ml-auto text-red-400 text-xs hover:text-red-600">Delete Pair</button>
      </div>
      <div className="flex gap-3 p-3">
        <UnitPanel cab={uA} dept={dept} people={p.people} assignments={p.assignments} breakers={p.breakers} photos={p.photos} reworkLogs={p.reworkLogs} onUpdate={p.onUpdate} onDelete={p.onDelete} onSendBack={p.onSendBack} onReworkSave={p.onReworkSave} onReworkDelete={p.onReworkDelete} onReworkReturned={p.onReworkReturned} onPhotoAdd={p.onPhotoAdd} onPhotoDelete={p.onPhotoDelete} />
        <div className="flex items-center justify-center text-gray-300 text-lg font-bold shrink-0">|</div>
        <UnitPanel cab={uB} dept={dept} people={p.people} assignments={p.assignments} breakers={p.breakers} photos={p.photos} reworkLogs={p.reworkLogs} onUpdate={p.onUpdate} onDelete={p.onDelete} onSendBack={p.onSendBack} onReworkSave={p.onReworkSave} onReworkDelete={p.onReworkDelete} onReworkReturned={p.onReworkReturned} onPhotoAdd={p.onPhotoAdd} onPhotoDelete={p.onPhotoDelete} />
      </div>
      {pipeBar}
    </div>
  );
}

function CabinetCard(p) {
  var cab=p.cab;
  var dept=p.dept;
  var [showRework,setShowRework]=useState(false);
  var [showPhotos,setShowPhotos]=useState(false);
  var [showNotes,setShowNotes]=useState(false);
  var [showSkidDrop,setShowSkidDrop]=useState(false);
  var [showBkr,setShowBkr]=useState(false);
  var [showSendBack,setShowSendBack]=useState(false);
  var [tech,setTech]=useState("");
  var result=getResult(cab);
  var deptAssign=p.assignments[dept]||{};
  var personMap={};
  p.people.filter(function(x){return x.dept===dept;}).forEach(function(x){personMap[x.id]=x.name;});
  var pname=deptAssign[cab.name]?personMap[deptAssign[cab.name]]:null;
  var assignedBreakers=p.breakers.filter(function(b){return (cab.breakerIds||[]).indexOf(b.id)>=0;});
  var photoCount=(p.photos[cab.id]||[]).length;
  var nextDept=PIPELINE[PIPELINE.indexOf(dept)+1];
  var borderColor=result==="Fail"?"#fca5a5":result==="Pass"?"#86efac":"#e5e7eb";
  var allSkids=p.skids||[];
  var assignedSkids=allSkids.filter(function(s){return (s.cabinets||[]).indexOf(cab.name)>=0;});
  var pipeBar=dept!=="Rework"?(
    <div className="mt-3 flex items-center gap-1">
      {PIPELINE.map(function(d,i){
        var dIdx=PIPELINE.indexOf(dept);
        var filled=i<dIdx||(i===dIdx&&cab.status!=="Pending");
        var active=i===dIdx;
        var bc=result==="Fail"&&active?"#f87171":filled?"#4ade80":(active&&cab.status==="In Progress")?"#fbbf24":"#e5e7eb";
        return (
          <div key={d} className="flex items-center gap-1 flex-1">
            <div className="flex-1 h-1.5 rounded-full" style={{background:bc}} />
            <span className={"text-xs font-semibold px-1 rounded "+(active?"ring-2 ring-blue-400 ":"")+(filled?"text-green-700":"text-gray-400")}>{d}</span>
          </div>
        );
      })}
      <div className="ml-1 h-1.5 w-4 rounded-full" style={{background:dept==="UL"&&cab.status==="Complete"&&result==="Pass"?"#4ade80":"#e5e7eb"}} />
    </div>
  ):null;
  return (
    <div>
      <div className="bg-white rounded-xl p-4 shadow-sm" style={{border:"1px solid "+borderColor}}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-800">{cab.name}</span>
              {cab.moNumber?<span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{"M.O. "+cab.moNumber}</span>:null}
              <span className={"text-xs font-medium px-2 py-0.5 rounded-full "+statusColor(cab.status)}>{cab.status}</span>
              <span className={"text-xs font-bold px-2 py-0.5 rounded-full "+resultColor(result)}>{result===NONE?"No Result":result}</span>
              {(cab.reworkCount||0)>0?<span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">{"Rework x"+cab.reworkCount}</span>:null}
              {cab.originDept?<span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">{"From "+cab.originDept}</span>:null}
              {pname?<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">{"@ "+pname}</span>:null}
            </div>
            <p className="text-xs text-gray-400 mt-1">{photoCount>0?photoCount+" photos / ":""}{assignedBreakers.length+" breakers assigned"}</p>
            {assignedSkids.length>0?(
              <div className="flex flex-wrap gap-1 mt-1">
                {assignedSkids.map(function(s){return <span key={s.id} className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">{s.name+(s.skidNumber?" #"+s.skidNumber:"")}</span>;})}
              </div>
            ):null}
            {assignedBreakers.length>0?(
              <div className="mt-2 space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Breakers</p>
                {assignedBreakers.map(function(b){
                  var ft=b.frameType||"";
                  var mCls=b.manufacturer==="Siemens"?"bg-blue-100 text-blue-800":"bg-red-100 text-red-700";
                  return (
                    <div key={b.id} className="flex items-center gap-1.5 flex-wrap bg-gray-50 rounded-lg px-2 py-1.5">
                      <span className="font-mono text-xs font-bold text-blue-700">{b.serial}</span>
                      <span className={"text-xs font-bold px-1.5 py-0.5 rounded-full "+mCls}>{b.manufacturer||"ABB"}</span>
                      {ft.toLowerCase().indexOf("t max")>=0?<span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700">T Max</span>:null}
                      {ft.toLowerCase().indexOf("emax")>=0?<span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Emax</span>:null}
                      <span className="text-xs text-gray-500">{b.model||"---"}</span>
                    </div>
                  );
                })}
              </div>
            ):null}
            {cab.notes?<p className="text-xs text-gray-500 mt-1 italic">{cab.notes}</p>:null}
            <MoEdit cab={cab} onSave={p.onUpdate} />
          </div>
          <div className="flex gap-1.5 flex-wrap items-start">
            {dept!=="Rework"?(
              <select value={tech} onChange={function(e){setTech(e.target.value);}} className="border rounded px-2 py-1 text-xs bg-white">
                <option value="">Tech...</option>
                {p.people.filter(function(x){return x.dept===dept;}).map(function(x){return <option key={x.id} value={x.name}>{x.name}</option>;})}
              </select>
            ):null}
            <select value={cab.status} onChange={function(e){p.onUpdate(cab.id,{status:e.target.value},e.target.value==="Complete"?tech:null);}} className="border rounded px-2 py-1 text-xs bg-white">
              {CAB_STATUSES.map(function(st){return <option key={st}>{st}</option>;})}
            </select>
            {dept!=="Rework"?(
              <div className="flex rounded overflow-hidden border text-xs font-bold">
                <button onClick={function(){p.onUpdate(cab.id,{result:result==="Pass"?NONE:"Pass"});}} className={"px-3 py-1 "+(result==="Pass"?"bg-green-500 text-white":"bg-white text-gray-400")}>Pass</button>
                <button onClick={function(){p.onUpdate(cab.id,{result:result==="Fail"?NONE:"Fail"});}} className={"px-3 py-1 "+(result==="Fail"?"bg-red-500 text-white":"bg-white text-gray-400")}>Fail</button>
              </div>
            ):null}
            <button onClick={function(){setShowBkr(true);}} className={"text-xs border rounded px-2 py-1 "+(assignedBreakers.length>0?"border-blue-400 text-blue-600":"border-gray-300 text-gray-600")}>{"\u26A1 "+(assignedBreakers.length>0?assignedBreakers.length+" Breakers":"Breakers")}</button>
            <button onClick={function(){setShowRework(true);}} className="text-xs border border-red-300 text-red-600 rounded px-2 py-1">{"\uD83D\uDD27 Rework"}</button>
            <button onClick={function(){setShowPhotos(true);}} className="text-xs border border-gray-300 text-gray-600 rounded px-2 py-1">{"\uD83D\uDCF7 Photos"}</button>
            <button onClick={function(){setShowNotes(true);}} className={"text-xs border rounded px-2 py-1 "+(cab.notes?"border-yellow-400 text-yellow-600":"border-gray-300 text-gray-600")}>{"\uD83D\uDCDD Notes"}</button>
            <div className="relative">
              <button onClick={function(){setShowSkidDrop(function(v){return !v;});}} className="text-xs border border-indigo-300 text-indigo-600 rounded px-2 py-1 hover:bg-indigo-50">{"\uD83D\uDD29 Skid "+(assignedSkids.length>0?assignedSkids.length:"")}</button>
              {showSkidDrop?(
                <div className="absolute left-0 top-7 z-20 bg-white border rounded-xl shadow-lg p-3 min-w-48 space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Assign to Skid</p>
                  {allSkids.length===0?<p className="text-xs text-gray-400 py-2">No skids yet.</p>:null}
                  {allSkids.map(function(s){
                    var asgn=(s.cabinets||[]).indexOf(cab.name)>=0;
                    return (
                      <button key={s.id} onClick={function(){p.onToggleSkid(s.id,cab.name);}}
                        className={"w-full text-left text-xs px-3 py-2 rounded-lg border transition "+(asgn?"border-indigo-500 bg-indigo-50 text-indigo-700":"border-gray-200 text-gray-600 hover:bg-gray-50")}>
                        <span className="font-medium">{s.name}</span>
                        {s.skidNumber?<span className="ml-1 font-mono text-gray-400">{"#"+s.skidNumber}</span>:null}
                        <span className={"float-right "+(asgn?"text-indigo-500":"text-gray-300")}>{asgn?"ok":""}</span>
                      </button>
                    );
                  })}
                  <button onClick={function(){setShowSkidDrop(false);}} className="w-full text-xs text-gray-400 pt-1 text-center hover:text-gray-600">Close</button>
                </div>
              ):null}
            </div>
            {dept==="Rework"?<button onClick={function(){setShowSendBack(true);}} className="text-xs font-semibold px-3 py-1 rounded border-2 border-blue-400 text-blue-700">Send Back</button>:null}
            {result==="Fail"&&dept!=="Rework"?<span className="text-xs text-red-600 font-semibold">In Rework</span>:null}
            {nextDept&&cab.status==="Complete"&&result==="Pass"?<span className="text-xs text-green-600">{"Ready for "+nextDept}</span>:null}
            {dept==="UL"&&cab.status==="Complete"&&result==="Pass"?<span className="text-xs text-green-700 font-bold">Certified</span>:null}
            <button onClick={function(){p.onDelete(cab.id);}} className="text-red-400 text-xs">Del</button>
            <button onClick={function(){p.onDeleteAll(cab.name);}} className="text-red-600 text-xs">Del All</button>
          </div>
        </div>
        {pipeBar}
      </div>
      {showBkr?<BreakerAssignModal cab={cab} breakers={p.breakers} onSave={p.onUpdate} onClose={function(){setShowBkr(false);}} />:null}
      {showRework?<ReworkModal cab={cab} reworkLogs={p.reworkLogs} onSave={p.onReworkSave} onDelete={p.onReworkDelete} onMarkReturned={p.onReworkReturned} onClose={function(){setShowRework(false);}} />:null}
      {showPhotos?<PhotosModal cab={cab} photos={p.photos} onAdd={p.onPhotoAdd} onDelete={p.onPhotoDelete} onClose={function(){setShowPhotos(false);}} />:null}
      {showNotes?<NotesModal cab={cab} onSave={p.onUpdate} onClose={function(){setShowNotes(false);}} />:null}
      {showSendBack?<SendBackModal cab={cab} defaultDept={cab.originDept||"QC"} onConfirm={function(t){p.onSendBack(cab,t);}} onClose={function(){setShowSendBack(false);}} />:null}
    </div>
  );
}

function DeptView(p) {
  var dept=p.dept;
  var db=p.db;
  var autoAssignMap=p.autoAssign;
  var setAutoAssign=p.setAutoAssign;
  var deptAutoAssign=autoAssignMap[dept]||false;
  var ds=DS[dept];
  var dm=DEPT_META[dept];
  var deptCabs=db.cabinets.filter(function(c){return c.dept===dept;});
  var deptPeople=db.people.filter(function(x){return x.dept===dept;});
  var deptMoves=db.movements.filter(function(m){return m.dept===dept;});
  var todayStr=new Date().toISOString().slice(0,10);
  var todayMoves=deptMoves.filter(function(m){return m.timestamp&&m.timestamp.slice(0,10)===todayStr;});
  var todayIn=todayMoves.filter(function(m){return m.direction==="IN";}).length;
  var todayOut=todayMoves.filter(function(m){return m.direction==="OUT";}).length;
  var remaining=Math.max(0,deptCabs.length-(todayIn+todayOut));
  var [subTab,setSubTab]=useState("skids");
  var [modal,setModal]=useState(null);
  var [selBreaker,setSelBreaker]=useState(null);
  var [newPerson,setNewPerson]=useState("");
  var [newPersonBay,setNewPersonBay]=useState("");
  var [assignLocal,setAssignLocal]=useState({});
  var [movForm,setMovForm]=useState(null);
  var [search,setSearch]=useState("");
  var [expandedSkid,setExpandedSkid]=useState(null);
  var [cabName,setCabName]=useState("");
  var [cabMo,setCabMo]=useState("");
  var [skidName,setSkidName]=useState("");
  var [skidNum,setSkidNum]=useState("");
  var [skidNotes,setSkidNotes]=useState("");
  var [trName,setTrName]=useState("");
  var [trLabel,setTrLabel]=useState("Unit A");
  var [trLabelB,setTrLabelB]=useState("Unit B");
  var [trMoA,setTrMoA]=useState("");
  var [trMoB,setTrMoB]=useState("");
  var total=deptCabs.length||1;
  var comp=deptCabs.filter(function(c){return c.status==="Complete";}).length;
  var inProg=deptCabs.filter(function(c){return c.status==="In Progress";}).length;
  var pend=deptCabs.filter(function(c){return c.status==="Pending";}).length;
  var passed=deptCabs.filter(function(c){return c.result==="Pass";}).length;
  var failed=deptCabs.filter(function(c){return c.result==="Fail";}).length;
  var bayAssignments=db.bayAssignments||{};
  var allSkids=db.skids||[];

  function getNextAssignee(ca,people){
    if(!people.length)return null;
    var counts={};
    people.forEach(function(x){counts[x.id]=0;});
    Object.values(ca).forEach(function(pid){if(counts[pid]!==undefined)counts[pid]++;});
    return people.reduce(function(min,x){return counts[x.id]<counts[min.id]?x:min;}).id;
  }

  function setDeptAutoAssign(val){
    var newVal=typeof val==="function"?val(autoAssignMap[dept]):val;
    setAutoAssign(function(prev){return Object.assign({},prev,{[dept]:newVal});});
    if(newVal){
      var dpl=db.people.filter(function(x){return x.dept===dept;});
      if(!dpl.length)return;
      var ca=Object.assign({},db.assignments[dept]||{});
      deptCabs.filter(function(c){return !ca[c.name];}).forEach(function(c){
        var pid=getNextAssignee(ca,dpl);if(pid)ca[c.name]=pid;
      });
      p.setDb(function(prev){var next=Object.assign({},prev,{assignments:Object.assign({},prev.assignments,{[dept]:ca})});save("qa_data",next);return next;});
    }
  }

  function updateDb(patch){p.setDb(function(prev){var next=Object.assign({},prev,patch);save("qa_data",next);return next;});}

  function updateCab(id,changes,completeTech){
    var cabs=db.cabinets.map(function(c){return c.id===id?Object.assign({},c,changes):c;});
    var cab=db.cabinets.find(function(c){return c.id===id;});
    if(changes.status==="Complete"&&cab){
      var nd=PIPELINE[PIPELINE.indexOf(dept)+1];
      var ts=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
      if(nd){
        p.onToast({type:"transition",icon:DEPT_META[nd].icon,title:dept+" to "+nd+": "+cab.name,body:(completeTech||"")+" at "+ts});
        var na=Object.assign({},db.assignments);
        var nda=Object.assign({},na[nd]||{});
        var ndp=db.people.filter(function(x){return x.dept===nd;});
        if(cab.transRepair&&cab.pairId){
          var partner=cabs.find(function(c){return c.pairId===cab.pairId&&c.id!==cab.id&&c.dept===dept;});
          var exA=cabs.find(function(c){return c.pairId===cab.pairId&&c.dept===nd&&c.pairLabel===cab.pairLabel;});
          var ncA=null;var ncB=null;
          if(!exA){ncA=makeCab("cab_"+nd+"_auto_"+Date.now(),cab.name,cab.moNumber,nd,cab);cabs.push(ncA);}
          if(partner){var exB=cabs.find(function(c){return c.pairId===cab.pairId&&c.dept===nd&&c.pairLabel===partner.pairLabel;});if(!exB){ncB=makeCab("cab_"+nd+"_auto_"+(Date.now()+1),partner.name,partner.moNumber,nd,partner);cabs.push(ncB);}}
          if(autoAssignMap[nd]){if(ncA){var p1=getNextAssignee(nda,ndp);if(p1)nda[ncA.name]=p1;}if(ncB){var p2=getNextAssignee(nda,ndp);if(p2)nda[ncB.name]=p2;}na[nd]=nda;updateDb({cabinets:cabs,assignments:na});return;}
        } else {
          var ex=cabs.find(function(c){return c.name===cab.name&&c.dept===nd&&c.status!=="Complete";});
          var ncs=null;
          if(!ex){ncs=makeCab("cab_"+nd+"_auto_"+Date.now(),cab.name,cab.moNumber,nd,cab);cabs.push(ncs);}
          if(autoAssignMap[nd]&&ncs){var p3=getNextAssignee(nda,ndp);if(p3)nda[ncs.name]=p3;na[nd]=nda;updateDb({cabinets:cabs,assignments:na});return;}
        }
      } else {
        p.onToast({type:"transition",icon:"ok",title:cab.name+" Fully Certified",body:"All departments complete at "+ts});
      }
    }
    if(changes.result==="Fail"&&cab){
      var arw=cabs.find(function(c){return c.name===cab.name&&c.dept==="Rework"&&c.status!=="Complete"&&c.originDept===dept;});
      if(!arw){cabs.push(Object.assign(makeCab("rw_"+id+"_"+Date.now(),cab.name,cab.moNumber,"Rework",cab),{originDept:dept,status:"Pending",result:NONE}));p.onToast({type:"fail",icon:"R",title:"Sent to Rework: "+cab.name,body:"Failed "+dept});}
    }
    updateDb({cabinets:cabs});
  }

  function sendBack(cab,target){
    var rc=(cab.reworkCount||0)+1;
    var updated=db.cabinets.filter(function(c){return c.id!==cab.id;});
    var existing=updated.find(function(c){return c.name===cab.name&&c.dept===target&&c.status!=="Complete";});
    if(!existing){updated.push(Object.assign(makeCab("cab_"+target+"_sb_"+Date.now(),cab.name,cab.moNumber,target,cab),{originDept:target,reworkCount:rc,status:"Pending",result:NONE}));}
    updateDb({cabinets:updated});
    p.onToast({type:"transition",icon:DEPT_META[target].icon,title:"Back to "+target+": "+cab.name,body:"Rework #"+rc+" complete"});
  }

  function deleteCab(id){updateDb({cabinets:db.cabinets.filter(function(c){return c.id!==id;})});}
  function deleteAllCabs(name){updateDb({cabinets:db.cabinets.filter(function(c){return c.name!==name;})});}
  function deletePair(idA,idB){updateDb({cabinets:db.cabinets.filter(function(c){return c.id!==idA&&c.id!==idB;})});}

  function addCab(){
    if(!cabName.trim())return;
    var nc=makeCab("cab_"+dept+"_"+Date.now(),cabName.trim(),cabMo.trim(),dept);
    var na=Object.assign({},db.assignments);
    if(deptAutoAssign){var dpl=db.people.filter(function(x){return x.dept===dept;});var pid=getNextAssignee(na[dept]||{},dpl);if(pid)na[dept]=Object.assign({},na[dept]||{},{[nc.name]:pid});}
    updateDb({cabinets:db.cabinets.concat([nc]),assignments:na});
    setCabName("");setCabMo("");
  }

  function addTransRepair(){
    if(!trName.trim())return;
    var pairId="tr_"+dept+"_"+Date.now();
    var labelA=trLabel.trim()||"Unit A";var labelB=trLabelB.trim()||"Unit B";
    var cabA=Object.assign(makeCab("cab_"+dept+"_trA_"+Date.now(),trName.trim()+" - "+labelA,trMoA.trim(),dept),{transRepair:true,pairId:pairId,pairLabel:labelA+" - A"});
    var cabB=Object.assign(makeCab("cab_"+dept+"_trB_"+(Date.now()+1),trName.trim()+" - "+labelB,trMoB.trim(),dept),{transRepair:true,pairId:pairId,pairLabel:labelB+" - B"});
    var na=Object.assign({},db.assignments);
    if(deptAutoAssign){var dpl2=db.people.filter(function(x){return x.dept===dept;});var da=Object.assign({},na[dept]||{});var pA=getNextAssignee(da,dpl2);if(pA)da[cabA.name]=pA;var pB=getNextAssignee(da,dpl2);if(pB)da[cabB.name]=pB;na[dept]=da;}
    updateDb({cabinets:db.cabinets.concat([cabA,cabB]),assignments:na});
    setTrName("");setTrLabel("Unit A");setTrLabelB("Unit B");setTrMoA("");setTrMoB("");
  }

  function addPerson(){
    if(!newPerson.trim())return;
    var person={id:"p_"+dept+"_"+Date.now(),name:newPerson.trim(),dept:dept};
    var nb=Object.assign({},bayAssignments);
    if(dept==="Test"&&newPersonBay.trim())nb[person.id]=newPersonBay.trim();
    updateDb({people:db.people.concat([person]),bayAssignments:nb});
    setNewPerson("");setNewPersonBay("");
  }
  function removePerson(pid){var nb=Object.assign({},bayAssignments);delete nb[pid];updateDb({people:db.people.filter(function(x){return x.id!==pid;}),bayAssignments:nb});}
  function updatePersonBay(pid,bay){updateDb({bayAssignments:Object.assign({},bayAssignments,{[pid]:bay})});}
  function saveAssign(local){updateDb({assignments:Object.assign({},db.assignments,{[dept]:local})});setModal(null);}
  function logMovement(f){updateDb({movements:db.movements.concat([Object.assign({},f,{id:"mov_"+dept+"_"+Date.now(),dept:dept})])});setMovForm(null);}
  function delMovement(mid){if(!confirm("Delete?"))return;updateDb({movements:db.movements.filter(function(m){return m.id!==mid;})});}
  function saveBreaker(f){var id=selBreaker&&selBreaker.id?selBreaker.id:"br_"+Date.now();var brs=selBreaker&&selBreaker.id?db.breakers.map(function(b){return b.id===id?Object.assign({},f,{id:id}):b;}):db.breakers.concat([Object.assign({},f,{id:id})]);updateDb({breakers:brs});setModal(null);setSelBreaker(null);}
  function deleteBreaker(bid){if(!confirm("Delete breaker?"))return;var logs=Object.assign({},db.logs);delete logs[bid];updateDb({breakers:db.breakers.filter(function(b){return b.id!==bid;}),logs:logs});setModal(null);}
  function saveLog(bid,f){var logs=Object.assign({},db.logs);logs[bid]=(logs[bid]||[]).concat([Object.assign({},f,{id:"lg_"+bid+"_"+Date.now()})]);updateDb({logs:logs});}
  function deleteLog(bid,lid){var logs=Object.assign({},db.logs);logs[bid]=(logs[bid]||[]).filter(function(l){return l.id!==lid;});updateDb({logs:logs});}
  function addPhoto(cid,photo){var ph=Object.assign({},db.photos);ph[cid]=(ph[cid]||[]).concat([photo]);updateDb({photos:ph});}
  function deletePhoto(cid,pid){var ph=Object.assign({},db.photos);ph[cid]=(ph[cid]||[]).filter(function(x){return x.id!==pid;});updateDb({photos:ph});}
  function saveRework(cid,f){var cab=db.cabinets.find(function(c){return c.id===cid;});var key=cab?cab.name:cid;var rw=Object.assign({},db.reworkLogs||{});rw[key]=(rw[key]||[]).concat([Object.assign({},f,{id:"rw_lg_"+key+"_"+Date.now()})]);updateDb({reworkLogs:rw});}
  function deleteRework(cid,rid){var cab=db.cabinets.find(function(c){return c.id===cid;});var key=cab?cab.name:cid;var rw=Object.assign({},db.reworkLogs||{});rw[key]=(rw[key]||[]).filter(function(r){return r.id!==rid;});updateDb({reworkLogs:rw});}
  function markReworkReturned(cid,rid){var cab=db.cabinets.find(function(c){return c.id===cid;});var key=cab?cab.name:cid;var today=new Date().toISOString().slice(0,10);var rw=Object.assign({},db.reworkLogs||{});rw[key]=(rw[key]||[]).map(function(r){return r.id===rid?Object.assign({},r,{dateReturned:today}):r;});updateDb({reworkLogs:rw});}
  function addSkid(){if(!skidName.trim())return;updateDb({skids:allSkids.concat([{id:"skid_global_"+Date.now(),name:skidName.trim(),skidNumber:skidNum.trim(),dept:"global",status:"Pending",notes:skidNotes.trim(),cabinets:[]}])});setSkidName("");setSkidNum("");setSkidNotes("");}
  function updateSkid(sid,changes){updateDb({skids:allSkids.map(function(s){return s.id===sid?Object.assign({},s,changes):s;})});}
  function deleteSkid(sid){if(!confirm("Delete skid?"))return;updateDb({skids:allSkids.filter(function(s){return s.id!==sid;})});}
  function toggleSkidCabinet(sid,cabName2){var skid=allSkids.find(function(s){return s.id===sid;});if(!skid)return;var cbs=skid.cabinets||[];updateSkid(sid,{cabinets:cbs.indexOf(cabName2)>=0?cbs.filter(function(c){return c!==cabName2;}):cbs.concat([cabName2])});}
  function getBayForTech(tn){var person=deptPeople.find(function(x){return x.name===tn;});return person?(bayAssignments[person.id]||""):"";}

  var deptAssign=db.assignments[dept]||{};
  var personMap={};
  deptPeople.forEach(function(x){personMap[x.id]=x.name;});
  var filtBr=db.breakers.filter(function(b){var q=search.toLowerCase();return !q||[b.serial,b.model,b.location,b.manufacturer,b.frameType].some(function(v){return v&&v.toLowerCase().indexOf(q)>=0;});});
  var now=new Date();
  var lt=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,16);

  var cabProps={dept:dept,people:db.people,assignments:db.assignments,breakers:db.breakers,photos:db.photos||{},reworkLogs:db.reworkLogs||{},skids:allSkids,onUpdate:updateCab,onDelete:deleteCab,onDeleteAll:deleteAllCabs,onSendBack:sendBack,onToast:p.onToast,onReworkSave:saveRework,onReworkDelete:deleteRework,onReworkReturned:markReworkReturned,onPhotoAdd:addPhoto,onPhotoDelete:deletePhoto,onToggleSkid:toggleSkidCabinet};
  var trProps={dept:dept,people:db.people,assignments:db.assignments,breakers:db.breakers,photos:db.photos||{},reworkLogs:db.reworkLogs||{},onUpdate:updateCab,onDelete:deleteCab,onDeleteAll:deleteAllCabs,onDeletePair:deletePair,onSendBack:sendBack,onToast:p.onToast,onReworkSave:saveRework,onReworkDelete:deleteRework,onReworkReturned:markReworkReturned,onPhotoAdd:addPhoto,onPhotoDelete:deletePhoto};

  return (
    <div className="space-y-4">
      <div className="rounded-xl p-4 border" style={{background:ds.bg,borderColor:ds.border,color:ds.text}}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">{dm.icon+" "+dept+" - "+dm.desc}</h2>
            <p className="text-xs opacity-70 mt-0.5">{deptCabs.length+" cabinets / "+deptPeople.length+" staff"}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={function(){setModal("people");}} style={{background:ds.btn}} className="text-white text-xs px-3 py-1.5 rounded-lg">People</button>
            <button onClick={function(){setAssignLocal(Object.assign({},deptAssign));setModal("assign");}} style={{background:ds.btn}} className="text-white text-xs px-3 py-1.5 rounded-lg">Assign</button>
            <button onClick={function(){setSelBreaker(null);setModal("addBreaker");}} style={{background:ds.btn}} className="text-white text-xs px-3 py-1.5 rounded-lg">+ Breaker</button>
            <button onClick={function(){setModal("export");}} className="bg-white border text-gray-700 text-xs px-3 py-1.5 rounded-lg">Export</button>
            {dept!=="Rework"?(
              <button onClick={function(){setDeptAutoAssign(function(v){return !v;});}}
                className={"text-xs px-3 py-1.5 rounded-lg font-semibold border-2 transition "+(deptAutoAssign?"bg-green-500 text-white border-green-500":"bg-white text-gray-500 border-gray-300")}>
                {deptAutoAssign?"Auto-Assign ON":"Auto-Assign OFF"}
              </button>
            ):null}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm px-5 py-4 space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Progress</h3>
        {[{l:"Complete",v:comp,c:"#22c55e"},{l:"In Progress",v:inProg,c:"#fbbf24"},{l:"Pending",v:pend,c:"#d1d5db"}].map(function(m){
          var pct=Math.round(m.v/total*100);
          return (
            <div key={m.l}>
              <div className="flex justify-between mb-1"><span className="text-xs text-gray-600">{m.l}</span><span className="text-xs font-bold text-gray-700">{m.v+"/"+deptCabs.length+" ("+pct+"%)"}</span></div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden"><div className="h-3 rounded-full" style={{width:pct+"%",background:m.c}} /></div>
            </div>
          );
        })}
        {(passed+failed)>0?(
          <div className="flex gap-3 pt-1 border-t flex-wrap text-xs">
            <span className="font-semibold text-gray-500">Results:</span>
            <span className="font-bold text-green-700">{"Pass: "+passed}</span>
            <span className="font-bold text-red-600">{"Fail: "+failed}</span>
            <span className="text-gray-400">{"of "+deptCabs.length}</span>
            {deptCabs.some(function(c){return(c.reworkCount||0)>0;})?<span className="font-bold text-orange-600">{"Re-inspections: "+deptCabs.reduce(function(s,c){return s+(c.reworkCount||0);},0)}</span>:null}
          </div>
        ):null}
      </div>

      <div className="bg-white border rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold text-gray-500 uppercase">Today</span>
        <span className="bg-green-50 border border-green-200 rounded-lg px-3 py-1 text-sm font-bold text-green-700">{"IN "+todayIn}</span>
        <span className="bg-red-50 border border-red-200 rounded-lg px-3 py-1 text-sm font-bold text-red-700">{"OUT "+todayOut}</span>
        <span className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-1 text-sm font-bold text-purple-700">{"Remaining "+remaining}</span>
        <button onClick={function(){setMovForm({cabinet:"",bay:"",direction:"IN",technician:"",timestamp:lt,notes:"",cabinetCustom:""}); }} style={{background:ds.btn}} className="ml-auto text-white text-sm px-4 py-1.5 rounded-lg">+ Log Movement</button>
      </div>

      <div className="flex gap-1 border-b bg-white px-3 pt-2 rounded-t-xl">
        {[["skids","Skids"],["cabinets","Cabinets"],["breakers","Breakers"],["movements","Movements"]].map(function(pair){
          return <button key={pair[0]} onClick={function(){setSubTab(pair[0]);}} className={"px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 "+(subTab===pair[0]?"border-blue-500 text-blue-700 bg-blue-50":"border-transparent text-gray-500")}>{pair[1]}</button>;
        })}
      </div>

      {subTab==="skids"?(
        <div className="space-y-3">
          <div className="bg-white rounded-xl border shadow-sm p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Add Skid</p>
            <input className={inp} placeholder="Skid name..." value={skidName} onChange={function(e){setSkidName(e.target.value);}} />
            <input className={inp} placeholder="Skid number..." value={skidNum} onChange={function(e){setSkidNum(e.target.value);}} />
            <input className={inp} placeholder="Notes (optional)..." value={skidNotes} onChange={function(e){setSkidNotes(e.target.value);}} />
            <button onClick={addSkid} style={{background:ds.btn}} className="w-full text-white rounded-lg py-2 text-sm font-medium">+ Add Skid</button>
          </div>
          {allSkids.length===0?<p className="text-center text-gray-400 py-8 text-sm">No skids yet.</p>:null}
          {allSkids.map(function(skid){
            var isExpanded=expandedSkid===skid.id;
            var pipeStats=PIPELINE.map(function(d){
              var cbs=db.cabinets.filter(function(c){return c.dept===d&&(skid.cabinets||[]).indexOf(c.name)>=0;});
              return {dept:d,total:cbs.length,comp:cbs.filter(function(c){return c.status==="Complete";}).length,passed:cbs.filter(function(c){return c.result==="Pass";}).length,failed:cbs.filter(function(c){return c.result==="Fail";}).length,cabs:cbs};
            });
            var totalCabs=pipeStats.reduce(function(s,x){return s+x.total;},0);
            var totalComp=pipeStats.reduce(function(s,x){return s+x.comp;},0);
            var overallPct=totalCabs>0?Math.round(totalComp/totalCabs*100):0;
            var allDeptCabs=db.cabinets.filter(function(c){return PIPELINE.indexOf(c.dept)>=0;});
            return (
              <div key={skid.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-800">{skid.name}</span>
                        {skid.skidNumber?<span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">{"#"+skid.skidNumber}</span>:null}
                        <span className={"text-xs font-medium px-2 py-0.5 rounded-full "+statusColor(skid.status)}>{skid.status}</span>
                        <span className="text-xs text-gray-400">{totalCabs+" cabs / "+overallPct+"% complete"}</span>
                      </div>
                      {skid.notes?<p className="text-xs text-gray-500 mt-1">{skid.notes}</p>:null}
                      <SkidNumberEdit skid={skid} onSave={updateSkid} />
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {pipeStats.map(function(ps){
                          var pct2=ps.total>0?Math.round(ps.comp/ps.total*100):0;
                          var ds2=DS[ps.dept];
                          return (
                            <div key={ps.dept} className="rounded-lg border p-2" style={{background:ds2.bg,borderColor:ds2.border}}>
                              <div className="flex items-center gap-1 mb-1">
                                <span className="text-xs font-bold" style={{color:ds2.text}}>{ps.dept}</span>
                                <span className="ml-auto text-xs font-bold" style={{color:ds2.text}}>{ps.comp+"/"+ps.total}</span>
                              </div>
                              <div className="w-full bg-white bg-opacity-60 rounded-full h-1.5 overflow-hidden">
                                <div className="h-1.5 rounded-full" style={{width:pct2+"%",background:ds2.btn}} />
                              </div>
                              {(ps.passed+ps.failed)>0?(
                                <div className="flex gap-2 mt-1">
                                  <span className="text-xs text-green-700 font-semibold">{"P:"+ps.passed}</span>
                                  {ps.failed>0?<span className="text-xs text-red-600 font-semibold">{"F:"+ps.failed}</span>:null}
                                </div>
                              ):null}
                              {ps.cabs.length>0?(
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {ps.cabs.map(function(c){return <span key={c.id} className={"text-xs px-1.5 py-0.5 rounded-full "+statusColor(c.status)}>{c.name}</span>;})}
                                </div>
                              ):null}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden"><div className="h-2 rounded-full bg-green-500" style={{width:overallPct+"%"}} /></div>
                        <p className="text-xs text-gray-400 mt-0.5">{overallPct+"% overall"}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center shrink-0">
                      <select value={skid.status} onChange={function(e){updateSkid(skid.id,{status:e.target.value});}} className="border rounded px-2 py-1 text-xs bg-white">
                        {CAB_STATUSES.map(function(st){return <option key={st}>{st}</option>;})}
                      </select>
                      <button onClick={function(){setExpandedSkid(isExpanded?null:skid.id);}} className="text-xs border border-gray-300 text-gray-600 rounded px-2 py-1 hover:bg-gray-50">{isExpanded?"Hide":"Assign Cabs"}</button>
                      <button onClick={function(){deleteSkid(skid.id);}} className="text-red-400 text-xs">Delete</button>
                    </div>
                  </div>
                  {isExpanded?(
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Assign Cabinets</p>
                      {allDeptCabs.length===0?<p className="text-xs text-gray-400">No cabinets yet.</p>:<SkidCabinetAssign skid={skid} deptCabs={allDeptCabs} onToggle={toggleSkidCabinet} />}
                    </div>
                  ):null}
                </div>
              </div>
            );
          })}
        </div>
      ):null}

      {subTab==="cabinets"?(
        <div className="space-y-3">
          <div className="bg-white rounded-xl border shadow-sm p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Add Standard Cabinet</p>
            <input className={inp} placeholder="Cabinet name..." value={cabName} onChange={function(e){setCabName(e.target.value);}} />
            <input className={inp} placeholder="M.O. number..." value={cabMo} onChange={function(e){setCabMo(e.target.value);}} />
            <button onClick={addCab} style={{background:ds.btn}} className="w-full text-white rounded-lg py-2 text-sm font-medium">+ Add Cabinet</button>
          </div>
          <div className="bg-white rounded-xl border-2 border-teal-200 shadow-sm p-4 space-y-2">
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Add Pair</p>
            <input className={inp} placeholder="Pair name (e.g. TR-001)..." value={trName} onChange={function(e){setTrName(e.target.value);}} />
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-teal-600">Unit A</p>
                <input className={inp} placeholder="Unit A name..." value={trLabel} onChange={function(e){setTrLabel(e.target.value);}} />
                <input className={inp} placeholder="Unit A M.O...." value={trMoA} onChange={function(e){setTrMoA(e.target.value);}} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-teal-600">Unit B</p>
                <input className={inp} placeholder="Unit B name..." value={trLabelB} onChange={function(e){setTrLabelB(e.target.value);}} />
                <input className={inp} placeholder="Unit B M.O...." value={trMoB} onChange={function(e){setTrMoB(e.target.value);}} />
              </div>
            </div>
            <button onClick={addTransRepair} className="w-full text-white rounded-lg py-2 text-sm font-medium" style={{background:"#0d9488"}}>+ Add Pair</button>
          </div>
          {deptCabs.length===0?<p className="text-center text-gray-400 py-8 text-sm">No cabinets yet.</p>:null}
          {(function(){
            var rendered={};
            return deptCabs.map(function(cab){
              if(cab.transRepair){
                if(rendered[cab.pairId])return null;
                rendered[cab.pairId]=true;
                var ua=deptCabs.find(function(c){return c.pairId===cab.pairId&&c.pairLabel&&c.pairLabel.indexOf("- A")>=0;});
                var ub=deptCabs.find(function(c){return c.pairId===cab.pairId&&c.pairLabel&&c.pairLabel.indexOf("- B")>=0;});
                if(!ua||!ub)return null;
                return <TransRepairCard key={cab.pairId} pairId={cab.pairId} unitA={ua} unitB={ub} {...trProps} />;
              }
              return <CabinetCard key={cab.id} cab={cab} {...cabProps} />;
            });
          })()}
        </div>
      ):null}

      {subTab==="breakers"?(
        <div className="space-y-3">
          <input className={inp} placeholder="Search breakers..." value={search} onChange={function(e){setSearch(e.target.value);}} />
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>{["Serial","Mfr","Frame","Model","Location","Assigned","Status",""].map(function(h){return <th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>;})}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtBr.length===0?<tr><td colSpan={8} className="text-center py-8 text-gray-400 text-sm">No breakers found.</td></tr>:null}
                  {filtBr.map(function(b){
                    var cab2=extractCabinet(b.location);
                    var pid2=cab2?(deptAssign[cab2]||null):null;
                    var pn2=pid2?personMap[pid2]:null;
                    var ft=b.frameType||"";
                    var mfrCls=b.manufacturer==="Siemens"?"bg-blue-100 text-blue-800":"bg-red-100 text-red-700";
                    return (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 font-mono text-blue-700 text-xs cursor-pointer" onClick={function(){setSelBreaker(b);setModal("viewBreaker");}}>{b.serial}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className={"text-xs font-bold px-1.5 py-0.5 rounded-full "+mfrCls}>{b.manufacturer||"ABB"}</span>
                          {ft.toLowerCase().indexOf("t max")>=0?<span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700">T Max</span>:null}
                          {ft.toLowerCase().indexOf("emax")>=0?<span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Emax</span>:null}
                        </td>
                        <td className="px-3 py-2 text-gray-500 text-xs">{b.frameType||"---"}</td>
                        <td className="px-3 py-2 text-gray-700 text-xs">{b.model||"---"}</td>
                        <td className="px-3 py-2 text-gray-600 text-xs whitespace-nowrap">{b.location||"---"}</td>
                        <td className="px-3 py-2">{pn2?<span className="bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 rounded-full">{pn2}</span>:<span className="text-gray-300 text-xs">---</span>}</td>
                        <td className="px-3 py-2"><span className={"px-1.5 py-0.5 rounded-full text-xs font-medium "+(BR_STATUS_COLORS[b.status]||"")}>{b.status}</span></td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <button onClick={function(){setSelBreaker(b);setModal("logs");}} className="text-green-600 text-xs mr-2">Logs</button>
                          <button onClick={function(){setSelBreaker(b);setModal("editBreaker");}} className="text-blue-500 text-xs mr-2">Edit</button>
                          <button onClick={function(){deleteBreaker(b.id);}} className="text-red-400 text-xs">Del</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t bg-gray-50 text-xs text-gray-400">{filtBr.length+" breakers"}</div>
          </div>
        </div>
      ):null}

      {subTab==="movements"?(
        <div className="space-y-3">
          {movForm!==null?(
            <div className="bg-white rounded-xl border p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">{"Log "+dept+" Movement"}</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  {["IN","OUT"].map(function(d){
                    var cls="flex-1 py-2 rounded-lg text-sm font-bold border-2 "+(movForm.direction===d?(d==="IN"?"bg-green-600 text-white border-green-600":"bg-red-600 text-white border-red-600"):"bg-white text-gray-400 border-gray-200");
                    return <button key={d} onClick={function(){setMovForm(function(f){return Object.assign({},f,{direction:d});});}} className={cls}>{d==="IN"?"IN to Bay":"OUT of Bay"}</button>;
                  })}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Cabinet *">
                    <select className={inp} value={movForm.cabinet} onChange={function(e){setMovForm(function(f){return Object.assign({},f,{cabinet:e.target.value});});}}>
                      <option value="">Select</option>
                      {(function(){var seen={};return deptCabs.filter(function(c){if(seen[c.name])return false;seen[c.name]=true;return true;}).map(function(c){return <option key={c.id}>{c.name}</option>;});})()}
                      <option value="__other__">Other</option>
                    </select>
                  </Field>
                  {movForm.cabinet==="__other__"?<Field label="Name"><input className={inp} value={movForm.cabinetCustom} onChange={function(e){setMovForm(function(f){return Object.assign({},f,{cabinetCustom:e.target.value});});}} /></Field>:null}
                  <Field label="Technician">
                    <select className={inp} value={movForm.technician} onChange={function(e){var tn=e.target.value;var ab=getBayForTech(tn);setMovForm(function(f){return Object.assign({},f,{technician:tn,bay:ab||f.bay});});}}>
                      <option value="">Select</option>
                      {deptPeople.map(function(x){var bay=bayAssignments[x.id];return <option key={x.id} value={x.name}>{x.name+(bay?" - Bay "+bay:"")}</option>;})}
                    </select>
                  </Field>
                  <Field label="Bay *"><input className={inp} value={movForm.bay} onChange={function(e){setMovForm(function(f){return Object.assign({},f,{bay:e.target.value});});}} placeholder="e.g. Bay 4" /></Field>
                  <Field label="Time"><input type="datetime-local" className={inp} value={movForm.timestamp} onChange={function(e){setMovForm(function(f){return Object.assign({},f,{timestamp:e.target.value});});}} /></Field>
                </div>
                <Field label="Notes"><textarea rows={2} className={inp} value={movForm.notes} onChange={function(e){setMovForm(function(f){return Object.assign({},f,{notes:e.target.value});});}} /></Field>
                <div className="flex gap-2">
                  <button onClick={function(){var c3=movForm.cabinet==="__other__"?movForm.cabinetCustom:movForm.cabinet;if(c3&&movForm.bay)logMovement(Object.assign({},movForm,{cabinet:c3}));}} style={{background:ds.btn}} className="flex-1 text-white rounded-lg py-2 text-sm">Log</button>
                  <button onClick={function(){setMovForm(null);}} className="flex-1 border rounded-lg py-2 text-sm text-gray-600">Cancel</button>
                </div>
              </div>
            </div>
          ):null}
          {movForm===null?<button onClick={function(){setMovForm({cabinet:"",bay:"",direction:"IN",technician:"",timestamp:lt,notes:"",cabinetCustom:""});}} style={{background:ds.btn}} className="w-full text-white rounded-xl py-2.5 text-sm">+ Log Movement</button>:null}
          {(function(){
            var grouped={};
            deptMoves.forEach(function(m){var d=m.timestamp?m.timestamp.slice(0,10):"Unknown";if(!grouped[d])grouped[d]=[];grouped[d].push(m);});
            var dates=Object.keys(grouped).sort(function(a,b){return b.localeCompare(a);});
            if(dates.length===0)return <p className="text-center text-gray-400 py-8 text-sm">No movements yet.</p>;
            return (
              <div className="space-y-3">
                {dates.map(function(date){
                  return (
                    <div key={date} className="bg-white rounded-xl border overflow-hidden">
                      <div className="px-4 py-2 bg-gray-50 border-b flex justify-between">
                        <span className="text-xs font-semibold text-gray-600">{date===todayStr?"Today":date}</span>
                        <span className="text-xs text-gray-400">{grouped[date].filter(function(m){return m.direction==="IN";}).length+" in / "+grouped[date].filter(function(m){return m.direction==="OUT";}).length+" out"}</span>
                      </div>
                      {grouped[date].map(function(m){
                        return (
                          <div key={m.id} className="px-4 py-3 flex items-start justify-between gap-3 border-t">
                            <div className="flex items-start gap-3">
                              <span className={"text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 "+(m.direction==="IN"?"bg-green-100 text-green-700":"bg-red-100 text-red-700")}>{m.direction}</span>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{m.cabinet+" to "+m.bay}</p>
                                <p className="text-xs text-gray-400">{(m.timestamp?m.timestamp.slice(11,16):"")+(m.technician?" / "+m.technician:"")+(m.notes?" / "+m.notes:"")}</p>
                              </div>
                            </div>
                            <button onClick={function(){delMovement(m.id);}} className="text-red-400 text-xs">Del</button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      ):null}

      {modal==="export"?<ExportModal dept={dept} db={db} onClose={function(){setModal(null);}} />:null}
      {modal==="people"?(
        <Modal title={dept+" - People"} onClose={function(){setModal(null);}}>
          <div className="space-y-4">
            <div className="space-y-2">
              <input className={inp} placeholder="Full name..." value={newPerson} onChange={function(e){setNewPerson(e.target.value);}} />
              {dept==="Test"?<input className={inp} placeholder="Assigned bay (e.g. Bay 3)..." value={newPersonBay} onChange={function(e){setNewPersonBay(e.target.value);}} />:null}
              <button onClick={addPerson} style={{background:ds.btn}} className="w-full text-white px-4 rounded-lg py-2 text-sm">Add Person</button>
            </div>
            {deptPeople.length===0?<p className="text-center text-gray-400 text-sm py-4">No people yet.</p>:null}
            {deptPeople.map(function(x){
              var bay=bayAssignments[x.id]||"";
              return (
                <div key={x.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{x.name}</p>
                    {dept==="Test"?(
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">Bay:</span>
                        <input className="border rounded px-2 py-0.5 text-xs w-24 focus:outline-none focus:ring-1 focus:ring-blue-400" value={bay} onChange={function(e){updatePersonBay(x.id,e.target.value);}} placeholder="Bay #" />
                      </div>
                    ):(bay?<p className="text-xs text-gray-400">{"Bay: "+bay}</p>:null)}
                  </div>
                  <button onClick={function(){removePerson(x.id);}} className="text-red-400 text-xs">Remove</button>
                </div>
              );
            })}
          </div>
        </Modal>
      ):null}
      {modal==="assign"?(
        <Modal title={dept+" - Assign Cabinets"} onClose={function(){setModal(null);}} wide>
          <div className="space-y-3">
            {deptCabs.length===0?<p className="text-gray-400 text-sm text-center py-6">No cabinets yet.</p>:null}
            {deptCabs.map(function(cab){
              return (
                <div key={cab.id} className="flex items-center justify-between gap-4 bg-gray-50 rounded-lg px-4 py-3">
                  <span className="text-sm font-semibold">{cab.name}{cab.moNumber?<span className="ml-2 text-xs text-gray-400 font-mono">{"M.O. "+cab.moNumber}</span>:null}</span>
                  <select className="border rounded-lg px-3 py-1.5 text-sm bg-white" value={assignLocal[cab.name]||""} onChange={function(e){var v=e.target.value;setAssignLocal(function(l){return Object.assign({},l,{[cab.name]:v});});}}>
                    <option value="">Unassigned</option>
                    {deptPeople.map(function(x){return <option key={x.id} value={x.id}>{x.name}</option>;})}
                  </select>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 pt-4">
            <button onClick={function(){saveAssign(assignLocal);}} style={{background:ds.btn}} className="flex-1 text-white rounded-lg py-2 text-sm">Save</button>
            <button onClick={function(){setModal(null);}} className="flex-1 border rounded-lg py-2 text-sm text-gray-600">Cancel</button>
          </div>
        </Modal>
      ):null}
      {modal==="addBreaker"?<Modal title="Add Breaker" onClose={function(){setModal(null);}}><BreakerForm onSave={saveBreaker} onCancel={function(){setModal(null);}} /></Modal>:null}
      {modal==="editBreaker"&&selBreaker?<Modal title="Edit Breaker" onClose={function(){setModal(null);}}><BreakerForm initial={selBreaker} onSave={saveBreaker} onCancel={function(){setModal(null);}} /></Modal>:null}
      {modal==="logs"&&selBreaker?<LogsModal bId={selBreaker.id} bSerial={selBreaker.serial} logs={db.logs||{}} onSave={saveLog} onDelete={deleteLog} onClose={function(){setModal(null);}} />:null}
      {modal==="viewBreaker"&&selBreaker?(
        <Modal title={"Breaker: "+selBreaker.serial} onClose={function(){setModal(null);}}>
          <div className="space-y-2">
            {[["Mfr","manufacturer"],["Frame","frameType"],["Model","model"],["Location","location"],["Voltage","voltage"],["Amperage","amperage"],["Install Date","installDate"],["Last Inspection","lastInspection"],["Notes","notes"]].map(function(pair){
              return (
                <div key={pair[0]} className="flex justify-between text-sm border-b pb-1">
                  <span className="text-gray-400">{pair[0]}</span>
                  <span className="font-medium text-gray-800">{selBreaker[pair[1]]||"---"}</span>
                </div>
              );
            })}
            <div className="flex gap-2 pt-2">
              <button onClick={function(){setModal("logs");}} className="flex-1 bg-green-600 text-white rounded-lg py-2 text-sm">Logs</button>
              <button onClick={function(){setModal("editBreaker");}} style={{background:ds.btn}} className="flex-1 text-white rounded-lg py-2 text-sm">Edit</button>
            </div>
          </div>
        </Modal>
      ):null}
    </div>
  );
}

export default function App() {
  var [db,setDb]=useState(null);
  var [activeTab,setActiveTab]=useState("QC");
  var [toasts,setToasts]=useState([]);
  var [autoAssign,setAutoAssign]=useState({QC:false,Test:false,UL:false});
  var tid=useRef(0);

  useEffect(function(){
    load("qa_data",null).then(function(stored){
      if(stored){
        if(!stored.reworkLogs)stored.reworkLogs={};
        if(!stored.photos)stored.photos={};
        if(!stored.skids)stored.skids=[];
        if(!stored.bayAssignments)stored.bayAssignments={};
        setDb(stored);
      } else {
        var init=Object.assign({},SEED_DATA);
        save("qa_data",init);
        setDb(init);
      }
    });
  },[]);

  var addToast=useCallback(function(t){
    var id=++tid.current;
    setToasts(function(ts){return [{id:id,type:t.type||"info",icon:t.icon,title:t.title,body:t.body}].concat(ts).slice(0,5);});
    setTimeout(function(){setToasts(function(ts){return ts.filter(function(x){return x.id!==id;});});},7000);
  },[]);

  function dismissToast(id){setToasts(function(ts){return ts.filter(function(x){return x.id!==id;});});}

  function handleReset(){
    if(confirm("Reset to demo data? This will erase ALL current data.")){
      var init=Object.assign({},SEED_DATA);
      save("qa_data",init);
      setDb(init);
    }
  }

  if(!db){
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-2xl font-bold mb-2">SC</p>
          <p className="text-sm">Loading SwitchCore...</p>
        </div>
      </div>
    );
  }

  var cabinets=db.cabinets;
  var pipeline=PIPELINE.map(function(d){
    return {dept:d,total:cabinets.filter(function(c){return c.dept===d;}).length,comp:cabinets.filter(function(c){return c.dept===d&&c.status==="Complete";}).length};
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Toast toasts={toasts} onDismiss={dismissToast} />
      <div className="bg-gray-900 text-white px-4 py-4 shadow">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L4.5 13.5H11.5L10 22L20 10H13L13 2Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SwitchCore</h1>
              <p className="text-gray-400 text-xs mt-0.5">Powering QA with the latest AI software. From progress, tracking, and completion.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {pipeline.map(function(s,i){
                return (
                  <div key={s.dept} className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:DS[s.dept].badgeBg,color:DS[s.dept].badgeText}}>{s.dept}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.comp+"/"+s.total}</div>
                    </div>
                    {i<pipeline.length-1?<span className="text-gray-600 text-sm"> &gt; </span>:null}
                  </div>
                );
              })}
              <span className="text-gray-600 text-sm ml-1"> &gt; Done</span>
            </div>
            <button onClick={handleReset} className="text-xs text-gray-500 border border-gray-600 rounded-lg px-2 py-1 hover:bg-red-700 hover:text-white hover:border-red-700 transition opacity-40 hover:opacity-100">
              Reset Demo
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex gap-1 pt-2">
          {DEPT_LIST.map(function(d){
            var dm=DEPT_META[d];
            var tot=cabinets.filter(function(c){return c.dept===d;}).length;
            var comp=cabinets.filter(function(c){return c.dept===d&&c.status==="Complete";}).length;
            var isRw=d==="Rework";
            var pend=cabinets.filter(function(c){return c.dept===d&&c.status!=="Complete";}).length;
            return (
              <button key={d} onClick={function(){setActiveTab(d);}}
                className={"px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 flex items-center gap-2 "+(activeTab===d?"border-blue-500 text-gray-800 bg-gray-50":"border-transparent text-gray-500 hover:text-gray-700")}>
                {d}
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{background:DS[d].badgeBg,color:DS[d].badgeText}}>{isRw?pend+" pending":comp+"/"+tot}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-5">
        <DeptView key={activeTab} dept={activeTab} db={db} setDb={setDb} onToast={addToast} autoAssign={autoAssign} setAutoAssign={setAutoAssign} />
      </div>
    </div>
  );
}
