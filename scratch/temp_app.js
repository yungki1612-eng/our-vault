if (typeof ResizeObserver === "undefined") {
  window.ResizeObserver = class ResizeObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
    }
    unobserve() {
    }
    disconnect() {
    }
  };
}
const generateUUID = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return ("10000000-1000-4000-8000" + -1e11).replace(
    /[018]/g,
    (c) => (c ^ (typeof crypto !== "undefined" && crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] : Math.floor(Math.random() * 256)) & 15 >> c / 4).toString(16)
  );
};
const { useState, useMemo, useEffect, useRef, useCallback } = React;
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip: RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Area, Sector, Sankey, Layer, Rectangle } = Recharts;
const firebaseConfig = {
  apiKey: "AIzaSyCE0_4D3wqRhweC_ZUxtr3LjAWXNK9i_Q8",
  authDomain: "yungki-sua.firebaseapp.com",
  projectId: "yungki-sua",
  storageBucket: "yungki-sua.firebasestorage.app",
  messagingSenderId: "154724593376",
  appId: "1:154724593376:web:7d3876ff45ddd4e02faa85"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const appId = "financial-app-v1";
const Icons = {
  LayoutDashboard: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { width: "7", height: "9", x: "3", y: "3", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { width: "7", height: "5", x: "14", y: "3", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { width: "7", height: "9", x: "14", y: "12", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { width: "7", height: "5", x: "3", y: "16", rx: "1" })),
  Table2: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" })),
  CreditCard: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { width: "20", height: "14", x: "2", y: "5", rx: "2" }), /* @__PURE__ */ React.createElement("line", { x1: "2", x2: "22", y1: "10", y2: "10" })),
  Banknote: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M6 12h.01M18 12h.01" })),
  TrendingUp: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17" }), /* @__PURE__ */ React.createElement("polyline", { points: "16 7 22 7 22 13" })),
  TrendingDown: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7" }), /* @__PURE__ */ React.createElement("polyline", { points: "16 17 22 17 22 11" })),
  Activity: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" })),
  Plus: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" }), /* @__PURE__ */ React.createElement("path", { d: "M12 5v14" })),
  Trash2: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18" }), /* @__PURE__ */ React.createElement("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }), /* @__PURE__ */ React.createElement("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }), /* @__PURE__ */ React.createElement("line", { x1: "10", x2: "10", y1: "11", y2: "17" }), /* @__PURE__ */ React.createElement("line", { x1: "14", x2: "14", y1: "11", y2: "17" })),
  CalendarPlus: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M8 2v4" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4" }), /* @__PURE__ */ React.createElement("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 10h18" }), /* @__PURE__ */ React.createElement("path", { d: "M10 16h4" }), /* @__PURE__ */ React.createElement("path", { d: "M12 14v4" })),
  ChevronRight: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "m9 18 6-6-6-6" })),
  Home: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), /* @__PURE__ */ React.createElement("polyline", { points: "9 22 9 12 15 12 15 22" })),
  Search: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.3-4.3" })),
  Info: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 16v-4" }), /* @__PURE__ */ React.createElement("path", { d: "M12 8h.01" })),
  Building2: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }), /* @__PURE__ */ React.createElement("path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }), /* @__PURE__ */ React.createElement("path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }), /* @__PURE__ */ React.createElement("path", { d: "M10 6h4" }), /* @__PURE__ */ React.createElement("path", { d: "M10 10h4" }), /* @__PURE__ */ React.createElement("path", { d: "M10 14h4" }), /* @__PURE__ */ React.createElement("path", { d: "M10 18h4" })),
  Lock: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })),
  Unlock: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V5a5 5 0 0 1 9.9-1" })),
  Eye: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" })),
  EyeOff: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }), /* @__PURE__ */ React.createElement("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }), /* @__PURE__ */ React.createElement("path", { d: "M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }), /* @__PURE__ */ React.createElement("line", { x1: "2", x2: "22", y1: "2", y2: "22" })),
  Cloud: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M17.5 19c3.037 0 5.5-2.463 5.5-5.5 0-2.57-1.766-4.735-4.142-5.341C18.423 4.197 14.88 2 10.5 2 6.22 2 2.723 4.887 2.062 8.784 0.81 9.68 0 11.1 0 12.7 0 15.35 2.15 17.5 4.8 17.5h.2c.4 0 .8-.05 1.2-.15.2-.05.4-.1.6-.15 3.1-.9 6.2-.9 9.3 0 .4.1.8.15 1.2.2.1 0 .2.05.3.05h.1z" })),
  RefreshCw: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M3 21v-5h5" })),
  Settings: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2l-.28 1.1a2 2 0 0 1-1 1.26l-.9.46a2 2 0 0 1-1.62.11L5 6.58a2 2 0 0 0-2.26.43l-.31.31a2 2 0 0 0-.43 2.26l.36.86a2 2 0 0 1-.11 1.62l-.46.9a2 2 0 0 1-1.26 1l-1.1.28a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2l1.1.28a2 2 0 0 1 1 1.26l.46.9a2 2 0 0 1 .11 1.62l-.36.86a2 2 0 0 0 .43 2.26l.31.31a2 2 0 0 0 2.26.43l.86-.36a2 2 0 0 1 1.62.11l.9.46a2 2 0 0 1 1 1.26l.28 1.1a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2l.28-1.1a2 2 0 0 1 1-1.26l.9-.46a2 2 0 0 1 1.62-.11l.86.36a2 2 0 0 0 2.26-.43l.31-.31a2 2 0 0 0 .43-2.26l-.36-.86a2 2 0 0 1 .11-1.62l.46-.9a2 2 0 0 1 1.26-1l1.1-.28a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2l-1.1-.28a2 2 0 0 1-1-1.26l-.46-.9a2 2 0 0 1-.11-1.62l.36-.86a2 2 0 0 0-.43-2.26l-.31-.31a2 2 0 0 0-2.26-.43l-.86.36a2 2 0 0 1-1.62-.11l-.9-.46a2 2 0 0 1-1-1.26l-.28-1.1a2 2 0 0 0-2-2z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" })),
  GripVertical: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "12", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "5", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "19", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "12", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "5", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "19", r: "1" })),
  X: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18" }), /* @__PURE__ */ React.createElement("path", { d: "m6 6 12 12" })),
  Filter: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" })),
  History: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }), /* @__PURE__ */ React.createElement("path", { d: "M3 3v5h5" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7v5l4 2" })),
  ArrowLeftRight: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M8 3 4 7l4 4" }), /* @__PURE__ */ React.createElement("path", { d: "M4 7h16" }), /* @__PURE__ */ React.createElement("path", { d: "m16 21 4-4-4-4" }), /* @__PURE__ */ React.createElement("path", { d: "M20 17H4" })),
  Coins: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "8", cy: "8", r: "6" }), /* @__PURE__ */ React.createElement("path", { d: "M18 8c0 3.3-2.7 6-6 6" }), /* @__PURE__ */ React.createElement("path", { d: "M6 12c.3 1.1 1.3 2 2.4 2h10.4c1.1 0 2.1-.9 2.4-2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 16c.3 1.1 1.3 2 2.4 2h10.4c1.1 0 2.1-.9 2.4-2" })),
  CandlestickChart: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 5v4" }), /* @__PURE__ */ React.createElement("rect", { width: "4", height: "6", x: "7", y: "9", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M9 15v2" }), /* @__PURE__ */ React.createElement("path", { d: "M17 3v2" }), /* @__PURE__ */ React.createElement("rect", { width: "4", height: "8", x: "15", y: "5", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M17 13v6" }), /* @__PURE__ */ React.createElement("rect", { width: "4", height: "3", x: "11", y: "13", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M13 10v3" }), /* @__PURE__ */ React.createElement("path", { d: "M13 16v1" })),
  ChevronLeft: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "m15 18-6-6 6-6" })),
  ChevronDown: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "m6 9 6 6 6-6" })),
  ChevronUp: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "m18 15-6-6-6 6" })),
  Bot: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 8V4H8" }), /* @__PURE__ */ React.createElement("rect", { width: "16", height: "12", x: "4", y: "8", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M2 14h2" }), /* @__PURE__ */ React.createElement("path", { d: "M20 14h2" }), /* @__PURE__ */ React.createElement("path", { d: "M15 13v2" }), /* @__PURE__ */ React.createElement("path", { d: "M9 13v2" })),
  Target: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "6" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "2" })),
  Bell: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }), /* @__PURE__ */ React.createElement("path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" })),
  ThumbsUp: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M7 10v12" }), /* @__PURE__ */ React.createElement("path", { d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" })),
  AlertCircle: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "8", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })),
  AlertTriangle: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "9", y2: "13" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12.01", y1: "17", y2: "17" })),
  Download: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), /* @__PURE__ */ React.createElement("polyline", { points: "7 10 12 15 17 10" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "15", y2: "3" })),
  Upload: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), /* @__PURE__ */ React.createElement("polyline", { points: "17 8 12 3 7 8" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "3", y2: "15" })),
  CandlestickChart: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 5v4" }), /* @__PURE__ */ React.createElement("rect", { width: "4", height: "6", x: "7", y: "9", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M9 15v2" }), /* @__PURE__ */ React.createElement("path", { d: "M17 3v2" }), /* @__PURE__ */ React.createElement("rect", { width: "4", height: "8", x: "15", y: "5", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M17 13v3" }), /* @__PURE__ */ React.createElement("path", { d: "M3 3v18h18" })),
  Calendar: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4" }), /* @__PURE__ */ React.createElement("path", { d: "M8 2v4" }), /* @__PURE__ */ React.createElement("path", { d: "M3 10h18" })),
  GripVertical: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "12", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "5", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "19", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "12", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "5", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "19", r: "1" })),
  Loader2: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })),
  Eye: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" })),
  EyeOff: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }), /* @__PURE__ */ React.createElement("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }), /* @__PURE__ */ React.createElement("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }), /* @__PURE__ */ React.createElement("line", { x1: "2", x2: "22", y1: "2", y2: "22" })),
  Edit2: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" })),
  Check: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("polyline", { points: "20 6 9 17 4 12" })),
  RefreshCw: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" })),
  Info: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 16v-4" }), /* @__PURE__ */ React.createElement("path", { d: "M12 8h.01" })),
  Calculator: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }), /* @__PURE__ */ React.createElement("line", { x1: "8", x2: "16", y1: "6", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "16", x2: "16", y1: "14", y2: "18" }), /* @__PURE__ */ React.createElement("path", { d: "M16 10h.01" }), /* @__PURE__ */ React.createElement("path", { d: "M12 10h.01" }), /* @__PURE__ */ React.createElement("path", { d: "M8 10h.01" }), /* @__PURE__ */ React.createElement("path", { d: "M12 14h.01" }), /* @__PURE__ */ React.createElement("path", { d: "M8 14h.01" }), /* @__PURE__ */ React.createElement("path", { d: "M12 18h.01" }), /* @__PURE__ */ React.createElement("path", { d: "M8 18h.01" })),
  Sparkles: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.912a2 2 0 0 1-1.275-1.275L12 3Z" }), /* @__PURE__ */ React.createElement("path", { d: "M5 3v4" }), /* @__PURE__ */ React.createElement("path", { d: "M9 5H5" }), /* @__PURE__ */ React.createElement("path", { d: "M3 7V3" }), /* @__PURE__ */ React.createElement("path", { d: "M7 5h-4" })),
  AlertOctagon: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("polygon", { points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "8", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })),
  Wallet: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 12V7H5a2 2 0 0 1 0-4h14v4" }), /* @__PURE__ */ React.createElement("path", { d: "M3 5v14a2 2 0 0 0 2 2h16v-5" }), /* @__PURE__ */ React.createElement("path", { d: "M18 12a2 2 0 0 0 0 4h4v-4Z" })),
  DollarSign: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "2", y2: "22" }), /* @__PURE__ */ React.createElement("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })),
  PieChart: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83" }), /* @__PURE__ */ React.createElement("path", { d: "M22 12A10 10 0 0 0 12 2v10z" })),
  Globe: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }), /* @__PURE__ */ React.createElement("path", { d: "M2 12h20" })),
  Minus: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" })),
  Cloud: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M17.5 19c0-1.7-1.3-3-3-3h-11" }), /* @__PURE__ */ React.createElement("path", { d: "M7 16.5L3.5 19 7 21.5" }), /* @__PURE__ */ React.createElement("path", { d: "M6.5 5c0 1.7 1.3 3 3 3h11" }), /* @__PURE__ */ React.createElement("path", { d: "M17 7.5L20.5 5 17 2.5" })),
  Copy: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })),
  CheckCircle2: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "m9 12 2 2 4-4" })),
  X: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18" }), /* @__PURE__ */ React.createElement("path", { d: "m6 6 18 18" })),
  Settings: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" })),
  Flag: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" }), /* @__PURE__ */ React.createElement("line", { x1: "4", x2: "4", y1: "22", y2: "15" })),
  ShieldCheck: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }), /* @__PURE__ */ React.createElement("path", { d: "m9 12 2 2 4-4" })),
  Sun: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M12 2v2" }), /* @__PURE__ */ React.createElement("path", { d: "M12 20v2" }), /* @__PURE__ */ React.createElement("path", { d: "m4.93 4.93 1.41 1.41" }), /* @__PURE__ */ React.createElement("path", { d: "m17.66 17.66 1.41 1.41" }), /* @__PURE__ */ React.createElement("path", { d: "M2 12h2" }), /* @__PURE__ */ React.createElement("path", { d: "M20 12h2" }), /* @__PURE__ */ React.createElement("path", { d: "m6.34 17.66-1.41 1.41" }), /* @__PURE__ */ React.createElement("path", { d: "m19.07 4.93-1.41 1.41" })),
  Moon: (p) => /* @__PURE__ */ React.createElement("svg", { ...p, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }))
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }
  handleReset = () => {
    if (confirm("Are you sure you want to reset and restore your data?")) {
      localStorage.removeItem("financialData");
      localStorage.removeItem("fm_sync_id");
      window.location.reload();
    }
  };
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex flex-col items-center justify-center bg-slate-900 p-6 text-center text-white" }, /* @__PURE__ */ React.createElement(Icons.AlertOctagon, { className: "w-16 h-16 text-rose-500 mb-4" }), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-slate-200 mb-2" }, "System Error Occurred"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-400 mb-6" }, "Error Details: ", this.state.error?.message || "Unknown error"), /* @__PURE__ */ React.createElement("button", { onClick: this.handleReset, className: "bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-700 transition-colors shadow-lg" }, "Reset & Restore Data"));
    }
    return this.props.children;
  }
}
const formatCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) return "0";
  return new Intl.NumberFormat("ko-KR", { style: "decimal", maximumFractionDigits: 0 }).format(value);
};
const formatNumberWithCommas = (value) => {
  if (!value && value !== 0) return "";
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const evaluateFormula = (val) => {
  if (typeof val === "number") return val;
  if (typeof val !== "string" || !val) return 0;
  try {
    const cleanExpr = val.replace(/,/g, "").replace(/^=/, "");
    if (!isNaN(cleanExpr) && cleanExpr.trim() !== "") return parseFloat(cleanExpr) || 0;
    const result = Function(`'use strict'; return (${cleanExpr})`)();
    return typeof result === "number" ? result : 0;
  } catch (e) {
    return 0;
  }
};
const getPreviousMonth = (ym) => {
  if (!ym || typeof ym !== "string") return "2024-01";
  const [y, m] = ym.split("-").map(Number);
  if (isNaN(y) || isNaN(m)) return "2024-01";
  let py = y, pm = m - 1;
  if (pm === 0) {
    py--;
    pm = 12;
  }
  if (py < 2024) return ym;
  return `${py}-${String(pm).padStart(2, "0")}`;
};
const isMonthKey = (key) => /^\d{4}-\d{2}$/.test(key);
const generateInitialData = () => {
  const data = {};
  data["2024-01"] = { assets: [], loans: [], budget: [], stockProfit: [] };
  data.meta = { sortOrder: {}, dashboardMemo: "", hiddenRows: {}, goals: { loan: 30, invest: 30, netWorth: 1e9 }, dashboardLayout: {} };
  const startYear = 2014;
  const endYear = 2025;
  const years = [];
  for (let y = startYear; y <= endYear; y++) years.push(String(y));
  data.salary = {
    years,
    items: [
      { id: 1, name: "\uC735\uAE30", values: {} },
      { id: 2, name: "\uC218\uC544", values: {} }
    ]
  };
  data.salary.items.forEach((item) => {
    years.forEach((y) => item.values[y] = 0);
  });
  return data;
};
const ASSET_CATEGORIES = {
  SAVINGS: { label: "Savings", color: "#3B82F6", bg: "bg-blue-500/10", text: "text-blue-400" },
  INVESTMENT: { label: "Stocks", color: "#8B5CF6", bg: "bg-violet-500/10", text: "text-violet-400" },
  COIN: { label: "Crypto", color: "#F59E0B", bg: "bg-amber-500/10", text: "text-amber-400" },
  REAL_ESTATE: { label: "Real Estate", color: "#10B981", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  PENSION: { label: "Pension", color: "#EC4899", bg: "bg-pink-500/10", text: "text-pink-400" }
};
const REAL_ESTATE_CATEGORIES = {
  APARTMENT: { label: "Apartment", bg: "bg-indigo-500/10", text: "text-indigo-400" },
  OFFICETEL: { label: "Officetel", bg: "bg-blue-500/10", text: "text-blue-400" },
  COMMERCIAL: { label: "Commercial/Office", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  LAND: { label: "Land", bg: "bg-amber-500/10", text: "text-amber-400" },
  OTHER: { label: "Other", bg: "bg-slate-500/10", text: "text-slate-400" }
};
const BUDGET_CATEGORIES = {
  INCOME: { label: "Income", type: "income", bg: "bg-sky-500/10", text: "text-sky-400" },
  SAVING: { label: "Savings", type: "expense", bg: "bg-teal-500/10", text: "text-teal-400" },
  INVEST: { label: "Investment", type: "expense", bg: "bg-indigo-500/10", text: "text-indigo-400" },
  EXPENSE: { label: "Expenses", type: "expense", bg: "bg-rose-500/10", text: "text-rose-400" }
};
const STOCK_PROFIT_CATEGORIES = {
  DIVIDEND: { label: "Dividend", color: "#10B981", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  STOCK_PROFIT: { label: "Stock Profit", color: "#6366F1", bg: "bg-indigo-500/10", text: "text-indigo-400" }
};
const STOCK_PROFIT_PERSONS = ["\uC735\uAE30", "\uC218\uC544"];
const normalizeCategory = (cat, type) => {
  const upper = String(cat || "").toUpperCase().trim();
  if (type === "assets") {
    if (["SAVING", "SAVINGS", "\uC608\uC801\uAE08", "\uD604\uAE08", "\uC801\uAE08", "\uC608\uAE08", "\uC800\uCD95", "BANK", "DEPOSIT", "CASH"].some((k) => upper.includes(k))) return "SAVINGS";
    if (["INVEST", "STOCK", "\uC8FC\uC2DD", "\uC99D\uAD8C", "\uD380\uB4DC", "STOCKS", "EQUITY", "PORTFOLIO"].some((k) => upper.includes(k))) return "INVESTMENT";
    if (["COIN", "CRYPTO", "\uCF54\uC778", "\uBE44\uD2B8\uCF54\uC778", "BTC", "ETH"].some((k) => upper.includes(k))) return "COIN";
    if (["ESTATE", "REAL", "\uBD80\uB3D9\uC0B0", "\uC804\uC138", "\uBCF4\uC99D\uAE08", "\uC544\uD30C\uD2B8", "\uC8FC\uD0DD", "REALESTATE", "PROPERTY", "LAND"].some((k) => upper.includes(k))) return "REAL_ESTATE";
    if (["PENSION", "IRP", "\uD1F4\uC9C1\uC5F0\uAE08", "\uC5F0\uAE08", "RETIREMENT"].some((k) => upper.includes(k))) return "PENSION";
    return "SAVINGS";
  } else if (type === "budget") {
    if (["INCOME", "REVENUE", "\uC218\uC785", "\uAE09\uC5EC", "\uC6D4\uAE09", "SALARY", "PAY"].some((k) => upper.includes(k))) return "INCOME";
    if (["SAVING", "\uC800\uCD95", "\uC801\uAE08", "SAVINGS"].some((k) => upper.includes(k))) return "SAVING";
    if (["INVEST", "\uD22C\uC790", "INVESTMENT"].some((k) => upper.includes(k))) return "INVEST";
    if (["EXPENSE", "EXPENSES", "\uC9C0\uCD9C", "\uC18C\uBE44", "\uCE74\uB4DC", "OUTFLOW"].some((k) => upper.includes(k))) return "EXPENSE";
    return "EXPENSE";
  } else if (type === "loans") {
    if (upper === "LEASE" || upper.includes("\uC804\uC138") || upper.includes("JEONSE")) return "LEASE";
    return "DEBT";
  }
  return upper;
};
const isItemHidden = (item, type, meta) => {
  if (!meta || !meta.hiddenRows || !meta.hiddenRows[type]) return false;
  let normalizedCat = item.category;
  if (type === "assets") {
    normalizedCat = ASSET_CATEGORIES[item.category] ? item.category : Object.keys(ASSET_CATEGORIES)[0];
  } else if (type === "budget") {
    normalizedCat = BUDGET_CATEGORIES[item.category] ? item.category : Object.keys(BUDGET_CATEGORIES)[0];
  } else if (type === "loans") {
    normalizedCat = "ALL";
  } else if (type === "stockProfit") {
    normalizedCat = STOCK_PROFIT_CATEGORIES[item.category] ? item.category : Object.keys(STOCK_PROFIT_CATEGORIES)[0];
  } else {
    normalizedCat = item.category || "ALL";
  }
  const itemKey = `${normalizedCat}|${item.category2 || ""}|${item.name}`;
  return meta.hiddenRows[type].includes(itemKey);
};
const parseCSVLine = (text) => {
  const result = [];
  let current = "";
  let inQuote = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') inQuote = !inQuote;
    else if (char === "," && !inQuote) {
      result.push(current.trim());
      current = "";
    } else current += char;
  }
  result.push(current.trim());
  return result.map((cell) => cell.replace(/^"|"$/g, "").replace(/""/g, ""));
};
const parseDateHeader = (header) => {
  if (!header) return null;
  let cleanHeader = header.replace(/^\uFEFF/, "").trim();
  const matchStandard = cleanHeader.match(/^(\d{4})[-./](\d{1,2})$/);
  if (matchStandard) return `${matchStandard[1]}-${String(matchStandard[2]).padStart(2, "0")}`;
  const matchShort = cleanHeader.match(/^(\d{2})[-./](\d{1,2})$/);
  if (matchShort) return `20${matchShort[1]}-${String(matchShort[2]).padStart(2, "0")}`;
  if (/^\d{6}$/.test(cleanHeader)) return `${cleanHeader.substring(0, 4)}-${cleanHeader.substring(4, 6)}`;
  const matchKorean = cleanHeader.match(/^(\d{4})년\s*(\d{1,2})월$/);
  if (matchKorean) return `${matchKorean[1]}-${String(matchKorean[2]).padStart(2, "0")}`;
  const months = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
  const lowerHeader = cleanHeader.toLowerCase();
  const matchEngYearFirst = lowerHeader.match(/^(\d{2})[-.\s]([a-z]{3})$/);
  if (matchEngYearFirst && months[matchEngYearFirst[2]]) return `20${matchEngYearFirst[1]}-${months[matchEngYearFirst[2]]}`;
  const matchEngMonthFirst = lowerHeader.match(/^([a-z]{3})[-.\s]?(\d{2,4})$/);
  if (matchEngMonthFirst && months[matchEngMonthFirst[1]]) {
    let year = matchEngMonthFirst[2];
    if (year.length === 2) year = "20" + year;
    return `${year}-${months[matchEngMonthFirst[1]]}`;
  }
  return null;
};
const processFileUpload = (file, currentData, type, onUpdate, setIsUploading) => {
  if (!file) return;
  setIsUploading(true);
  const parseFile = (encoding) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file, encoding);
    });
  };
  const processText = (text) => {
    if (text.charCodeAt(0) === 65279) text = text.substr(1);
    const lines = text.split(/\r\n|\n|\r/).filter((line) => line.trim() !== "");
    if (lines.length < 2) return { success: false, message: "Insufficient data." };
    const header = parseCSVLine(lines[0]);
    const monthIndices = {};
    header.forEach((col, idx) => {
      const parsedDate = parseDateHeader(col);
      if (parsedDate) monthIndices[parsedDate] = idx;
    });
    if (Object.keys(monthIndices).length === 0) return { success: false, message: "Date columns not found." };
    const newData = JSON.parse(JSON.stringify(currentData));
    Object.keys(monthIndices).forEach((m) => {
      if (!newData[m]) newData[m] = { assets: [], loans: [], budget: [], stockProfit: [] };
    });
    const hLower = header.map((h) => (h || "").trim().toLowerCase());
    const col1Idx = hLower.indexOf("category") !== -1 ? hLower.indexOf("category") : hLower.indexOf("\uD56D\uBAA91");
    const col2Idx = hLower.indexOf("subcategory") !== -1 ? hLower.indexOf("subcategory") : hLower.indexOf("\uD56D\uBAA92");
    const col3Idx = hLower.indexOf("item name") !== -1 ? hLower.indexOf("item name") : hLower.indexOf("item") !== -1 ? hLower.indexOf("item") : hLower.indexOf("\uD56D\uBAA93");
    const colNameIdx = hLower.indexOf("item name") !== -1 ? hLower.indexOf("item name") : hLower.indexOf("name") !== -1 ? hLower.indexOf("name") : hLower.indexOf("\uD56D\uBAA9\uBA85");
    const colTypeIdx = hLower.indexOf("type") !== -1 ? hLower.indexOf("type") : hLower.indexOf("\uAD6C\uBD84");
    const isNewTripleFormat = col1Idx !== -1 && col2Idx !== -1 && col3Idx !== -1;
    const isNewNameFormat = colNameIdx !== -1;
    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVLine(lines[i]);
      if (row.length < 2) continue;
      let category = "", category2 = "", name = "";
      if (type === "stockProfit" && isNewTripleFormat) {
        const catLabel = (row[col1Idx] || "").trim();
        category2 = (row[col2Idx] || "").trim();
        name = (row[col3Idx] || "").trim();
        const matchedKey = Object.entries(STOCK_PROFIT_CATEGORIES).find(([k, v]) => v.label === catLabel || k === catLabel.toUpperCase() || v.label.toUpperCase() === catLabel.toUpperCase());
        category = matchedKey ? matchedKey[0] : catLabel.includes("\uBC30\uB2F9") || catLabel.toLowerCase().includes("dividend") ? "DIVIDEND" : "STOCK_PROFIT";
      } else if (type === "stockProfit") {
        let rawType;
        if (isNewNameFormat && colTypeIdx !== -1) {
          name = (row[colNameIdx] || "").trim();
          rawType = (row[colTypeIdx] || "").trim().toUpperCase();
        } else {
          rawType = (row[0] || "").trim().toUpperCase();
          name = (row[1] || "").trim();
        }
        category = rawType === "D" || rawType === "DIVIDEND" ? "DIVIDEND" : "STOCK_PROFIT";
      } else if (isNewTripleFormat && (type === "assets" || type === "budget")) {
        const catLabel = (row[col1Idx] || "").trim();
        category2 = (row[col2Idx] || "").trim();
        name = (row[col3Idx] || "").trim();
        const cats = type === "assets" ? ASSET_CATEGORIES : BUDGET_CATEGORIES;
        const matchedKey = Object.entries(cats).find(([k, v]) => v.label === catLabel || k === catLabel.toUpperCase() || v.label.toUpperCase() === catLabel.toUpperCase());
        category = matchedKey ? matchedKey[0] : normalizeCategory(catLabel, type);
      } else if (isNewNameFormat && type === "loans") {
        name = (row[colNameIdx] || "").trim();
      } else {
        category = normalizeCategory((row[0] || "").trim(), type);
        name = (row[1] || "").trim();
      }
      if (!name) continue;
      Object.entries(monthIndices).forEach(([month, colIdx]) => {
        const rawVal = row[colIdx] ? row[colIdx].replace(/,/g, "") : "0";
        const val = parseFloat(rawVal) || 0;
        if (!newData[month]) newData[month] = { assets: [], loans: [], budget: [], stockProfit: [] };
        const listKey = type === "stockProfit" ? "stockProfit" : type;
        if (!newData[month][listKey]) newData[month][listKey] = [];
        const list = newData[month][listKey];
        const existingItem = list.find(
          (item) => item.name === name && (item.category || "") === category && (item.category2 || "") === category2
        );
        if (existingItem) {
          if (type === "stockProfit") {
            if (category === "DIVIDEND") existingItem.dividend = val;
            else existingItem.profit = val;
          } else {
            if (category) existingItem.category = category;
            if (category2 !== void 0) existingItem.category2 = category2;
            if (type === "assets") existingItem.value = val;
            else existingItem.amount = val;
          }
        } else {
          const newItem = { id: Date.now() + Math.random() + i, name };
          if (type === "stockProfit") {
            newItem.category = category;
            newItem.category2 = category2;
            newItem.profit = 0;
            newItem.dividend = 0;
            if (category === "DIVIDEND") newItem.dividend = val;
            else newItem.profit = val;
          } else {
            if (category) newItem.category = category;
            if (category2) newItem.category2 = category2;
            if (type === "assets") newItem.value = val;
            else newItem.amount = val;
          }
          list.push(newItem);
        }
      });
    }
    return { success: true, data: newData };
  };
  parseFile("UTF-8").then((text) => {
    let result = processText(text);
    if (result.success) {
      onUpdate(result.data);
      alert("Data uploaded successfully!");
      setIsUploading(false);
    } else {
      parseFile("EUC-KR").then((textKR) => {
        result = processText(textKR);
        if (result.success) {
          onUpdate(result.data);
          alert("Data uploaded successfully! (EUC-KR)");
        } else {
          alert(`Error: ${result.message}
(Supported formats: 2024-01, 24.01, Jan 24, etc.)`);
        }
        setIsUploading(false);
      }).catch(() => {
        alert(`Error: ${result.message}
(Supported formats: 2024-01, 24.01, Jan 24, etc.)`);
        setIsUploading(false);
      });
    }
  }).catch((err) => {
    console.error(err);
    alert("Failed to read file.");
    setIsUploading(false);
  });
};
const CSV_FILE_NAMES = {
  assets: "assets_management",
  budget: "income_expense",
  loans: "loans_debt",
  stockProfit: "stock_profits"
};
const downloadCSV = (data, type) => {
  const months = Object.keys(data).filter(isMonthKey).sort();
  const listKey = type === "stockProfit" ? "stockProfit" : type;
  const fileName = CSV_FILE_NAMES[type] || type;
  const uniqueItemsOrdered = [];
  const seenKeys = /* @__PURE__ */ new Set();
  months.forEach((m) => {
    (data[m]?.[listKey] || []).forEach((item) => {
      const cat1 = item.category || "";
      const cat2 = item.category2 || "";
      const key = `${cat1}|${cat2}|${item.name}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        uniqueItemsOrdered.push({ name: item.name, category: cat1, category2: cat2, key });
      }
    });
  });
  let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
  if (type === "assets" || type === "budget") {
    const categories = type === "assets" ? ASSET_CATEGORIES : BUDGET_CATEGORIES;
    csvContent += "Category,Subcategory,Item Name," + months.join(",") + "\n";
    uniqueItemsOrdered.forEach(({ name, category, category2 }) => {
      const catLabel = categories[category]?.label || category || "";
      const row = [`"${catLabel}"`, `"${category2}"`, `"${name}"`];
      months.forEach((m) => {
        const found = (data[m]?.[listKey] || []).find(
          (i) => i.name === name && (i.category || "") === category && (i.category2 || "") === category2
        );
        const val = found ? type === "assets" ? found.value ?? 0 : found.amount ?? 0 : 0;
        row.push(val);
      });
      csvContent += row.join(",") + "\n";
    });
  } else if (type === "loans") {
    csvContent += "Item Name," + months.join(",") + "\n";
    uniqueItemsOrdered.forEach(({ name }) => {
      const row = [`"${name}"`];
      months.forEach((m) => {
        const found = (data[m]?.[listKey] || []).find((i) => i.name === name);
        row.push(found ? found.amount ?? 0 : 0);
      });
      csvContent += row.join(",") + "\n";
    });
  } else if (type === "stockProfit") {
    csvContent += "Category,Subcategory,Item Name," + months.join(",") + "\n";
    uniqueItemsOrdered.forEach(({ name, category, category2 }) => {
      const catLabel = STOCK_PROFIT_CATEGORIES[category]?.label || category || "";
      const row = [`"${catLabel}"`, `"${category2}"`, `"${name}"`];
      months.forEach((m) => {
        const found = (data[m]?.[listKey] || []).find(
          (i) => i.name === name && (i.category || "") === category && (i.category2 || "") === category2
        );
        const isCatDividend = category === "DIVIDEND";
        const val = found ? isCatDividend ? found.dividend ?? 0 : found.profit ?? 0 : 0;
        row.push(val);
      });
      csvContent += row.join(",") + "\n";
    });
  }
  const blob = new Blob([csvContent.replace("data:text/csv;charset=utf-8,", "")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
const GlassCard = ({ children, className = "", onClick }) => /* @__PURE__ */ React.createElement("div", { onClick, className: `quantum-card rounded-2xl transition-all duration-300 ${className}` }, children);
const GlassButton = ({ children, onClick, active, className = "", disabled }) => /* @__PURE__ */ React.createElement("button", { onClick, disabled, className: `px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-200 ${active ? "bg-indigo-600 text-white border border-indigo-500 shadow-sm" : "quantum-btn text-slate-700 dark:text-slate-300"} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}` }, children);
const CollapsibleCard = ({ title, icon: Icon, children, className = "", initialOpen = true, headerExtra, noPadding = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return /* @__PURE__ */ React.createElement(GlassCard, { className: `flex flex-col transition-all duration-300 ${isOpen ? "" : "h-auto"} ${className}` }, /* @__PURE__ */ React.createElement("div", { className: "p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-t-2xl transition-colors select-none", onClick: () => setIsOpen(!isOpen) }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, Icon && /* @__PURE__ */ React.createElement("div", { className: "p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" }, /* @__PURE__ */ React.createElement(Icon, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-200 text-xs sm:text-sm uppercase tracking-wider font-grotesk" }, title)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, headerExtra && /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation() }, headerExtra), /* @__PURE__ */ React.createElement("div", { className: "text-slate-500" }, isOpen ? /* @__PURE__ */ React.createElement(Icons.ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(Icons.ChevronDown, { className: "w-4 h-4" })))), isOpen && /* @__PURE__ */ React.createElement("div", { className: `${noPadding ? "" : "px-6 pb-6"} flex-1 flex flex-col min-h-0 animate-fade-in` }, children));
};
const CurrencyInput = ({ value, onChange, className }) => {
  const [localValue, setLocalValue] = useState(String(value || 0));
  const [isEditing, setIsEditing] = useState(false);
  const calculate = (expression) => {
    if (typeof expression !== "string") return expression;
    try {
      const cleanExpr = expression.replace(/,/g, "").replace(/^=/, "");
      if (!isNaN(cleanExpr) && cleanExpr.trim() !== "") return parseFloat(cleanExpr) || 0;
      const result = Function(`'use strict'; return (${cleanExpr})`)();
      return typeof result === "number" ? result : 0;
    } catch (e) {
      return 0;
    }
  };
  useEffect(() => {
    if (!isEditing) {
      const displayVal = typeof value === "string" && /[\+\-\*\/\(\)]/.test(value) ? calculate(value) : value;
      setLocalValue(formatNumberWithCommas(displayVal));
    }
  }, [value, isEditing]);
  const handleBlur = () => {
    setIsEditing(false);
    const cleanInput = localValue.replace(/,/g, "").trim();
    const isFormula = /[\+\-\*\/\(\)]/.test(cleanInput) && isNaN(cleanInput);
    const finalValue = isFormula ? cleanInput : parseFloat(cleanInput) || 0;
    onChange(finalValue);
    setLocalValue(formatNumberWithCommas(calculate(cleanInput)));
  };
  return /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: localValue,
      onChange: (e) => setLocalValue(e.target.value),
      onFocus: () => {
        setIsEditing(true);
        setLocalValue(String(value || 0).replace(/,/g, ""));
      },
      onBlur: handleBlur,
      onKeyDown: (e) => e.key === "Enter" && e.target.blur(),
      className: `bg-transparent border-none outline-none w-full text-right font-medium text-inherit placeholder:text-slate-500 focus:ring-0 ${className}`
    }
  );
};
const SortableRow = ({ item, category, onDrop, children, isHidden, onToggleHide, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  useEffect(() => {
    setNewName(item.name);
  }, [item.name]);
  const handleDragStart = (e) => {
    if (isEditing) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("app/json", JSON.stringify({ name: item.name, category }));
  };
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("app/json"));
      if (data.name !== item.name) onDrop(category, data.name, item.name, data.category);
    } catch (err) {
    }
  };
  const saveName = () => {
    if (newName && newName !== item.name) onRename(item.name, newName);
    setIsEditing(false);
  };
  return /* @__PURE__ */ React.createElement("tr", { draggable: !isEditing, onDragStart: handleDragStart, onDragOver: (e) => e.preventDefault(), onDrop: handleDrop, className: `group transition-colors border-b border-white/5 last:border-0 hover:bg-cyan-500/5 odd:bg-[var(--ss-cell-bg)] even:bg-[var(--ss-cell-bg-alt)] ${isHidden ? "opacity-40 bg-black/40" : ""}` }, /* @__PURE__ */ React.createElement("td", { className: "sticky-col-cell align-middle" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 p-3 min-w-[176px]" }, /* @__PURE__ */ React.createElement("div", { className: "cursor-grab active:cursor-grabbing p-1.5 hover:bg-white/10 rounded-lg text-slate-400 transition-colors" }, /* @__PURE__ */ React.createElement(Icons.GripVertical, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    onToggleHide();
  }, className: "p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-colors" }, isHidden ? /* @__PURE__ */ React.createElement(Icons.EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ React.createElement(Icons.Eye, { className: "w-3.5 h-3.5" })), isEditing ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center flex-1" }, /* @__PURE__ */ React.createElement("input", { autoFocus: true, type: "text", value: newName, onChange: (e) => setNewName(e.target.value), onBlur: saveName, onKeyDown: (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) saveName();
  }, className: "bg-slate-900 border border-white/10 rounded-xl px-2 py-1 text-xs w-full focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 text-white shadow-sm text-left", onClick: (e) => e.stopPropagation() }), /* @__PURE__ */ React.createElement("button", { onClick: saveName, className: "p-1.5 text-emerald-400 ml-1 hover:bg-white/5 rounded-lg" }, /* @__PURE__ */ React.createElement(Icons.Check, { className: "w-3.5 h-3.5" }))) : /* @__PURE__ */ React.createElement("div", { className: "flex items-center flex-1 min-w-0 cursor-text group/edit", onClick: () => setIsEditing(true) }, /* @__PURE__ */ React.createElement("span", { className: `truncate text-xs font-bold flex-1 text-left ${isHidden ? "text-slate-500 line-through" : "text-slate-300"}`, title: item.name }, item.name), /* @__PURE__ */ React.createElement("button", { className: "p-1.5 text-slate-500 hover:text-cyan-400 opacity-0 group-hover/edit:opacity-100 transition-opacity" }, /* @__PURE__ */ React.createElement(Icons.Edit2, { className: "w-3.5 h-3.5" }))), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    onDelete();
  }, className: "p-1.5 text-slate-500 hover:text-rose-400 rounded-lg ml-1 opacity-0 group-hover:opacity-100 transition-opacity" }, /* @__PURE__ */ React.createElement(Icons.Trash2, { className: "w-3.5 h-3.5" })))), children);
};
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement(Sector, { cx, cy, innerRadius, outerRadius: outerRadius + 6, startAngle, endAngle, fill }), /* @__PURE__ */ React.createElement(Sector, { cx, cy, startAngle, endAngle, innerRadius: outerRadius + 6, outerRadius: outerRadius + 10, fill }));
};
const CompactScoreCard = ({ title, value, yoy, icon: Icon, colorClass, tooltip, breakdown }) => {
  let trendColor = "text-slate-400", trendBg = "bg-white/5", TrendIcon = Icons.TrendingUp;
  if (yoy !== void 0 && yoy !== null && !isNaN(yoy) && value !== 0) {
    if (yoy > 0) {
      trendColor = "text-rose-400";
      trendBg = "bg-rose-500/10";
      TrendIcon = Icons.TrendingUp;
    } else if (yoy < 0) {
      trendColor = "text-blue-400";
      trendBg = "bg-blue-500/10";
      TrendIcon = Icons.TrendingDown;
    }
  }
  let valueColor = "text-white";
  if (title.toLowerCase().includes("profit") || title.toLowerCase().includes("return") || title.toLowerCase().includes("gain")) {
    if (value > 0) valueColor = "text-rose-400";
    else if (value < 0) valueColor = "text-blue-400";
  }
  if (title.toLowerCase().includes("liabilities") || title.toLowerCase().includes("debt")) valueColor = "text-rose-400";
  const isNoHover = title === "Total Assets" || title === "Net Worth";
  return /* @__PURE__ */ React.createElement(GlassCard, { className: `p-3 flex flex-col justify-between h-full min-h-[90px] relative overflow-visible ${isNoHover ? "" : "group hover:-translate-y-1 transition-transform"} ${title === "Total Assets" ? "neon-border-cyan" : ""}` }, title === "Total Assets" && /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-0 w-20 h-20 opacity-20 pointer-events-none" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", className: "w-full h-full text-cyan-400" }, /* @__PURE__ */ React.createElement("circle", { cx: "100", cy: "0", r: "80", fill: "none", stroke: "currentColor", "stroke-dasharray": "3,3", strokeWidth: "1.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "100", cy: "0", r: "50", fill: "none", stroke: "currentColor", strokeWidth: "1" }))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1 relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 relative" }, /* @__PURE__ */ React.createElement("div", { className: "p-1 rounded bg-white/5 text-slate-400 group-hover:text-cyan-400 transition-colors" }, Icon ? /* @__PURE__ */ React.createElement(Icon, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ React.createElement(Icons.Wallet, { className: "w-3.5 h-3.5" })), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-bold uppercase tracking-widest ${title === "Total Assets" ? "text-cyan-400 font-grotesk" : "text-slate-400"}` }, title === "Total Assets" ? "PORTFOLIO_AGGREGATED_WORTH" : title), (tooltip || breakdown) && !isNoHover && /* @__PURE__ */ React.createElement("div", { className: "group/tip relative flex items-center" }, /* @__PURE__ */ React.createElement(Icons.Info, { className: "w-3 h-3 text-slate-500 hover:text-cyan-400 cursor-help" }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-0 top-full mt-2 w-48 bg-slate-950/95 backdrop-blur-md text-white text-[10px] rounded-lg p-3 opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity z-50 shadow-2xl border border-white/10" }, breakdown ? /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-cyan-400 border-b border-white/10 pb-1 mb-1 font-grotesk" }, title, " COMPOSITION"), breakdown.map((item, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400" }, item.label), /* @__PURE__ */ React.createElement("span", { className: `font-mono ${item.value < 0 ? "text-rose-400" : "text-slate-200"}` }, formatNumberWithCommas(item.value))))) : tooltip))), yoy !== void 0 && !isNaN(yoy) && /* @__PURE__ */ React.createElement("div", { className: `inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded-full ${trendBg} ${trendColor}` }, /* @__PURE__ */ React.createElement(TrendIcon, { className: "w-2.5 h-2.5 mr-0.5" }), "YoY ", Math.abs(yoy).toFixed(1), "%")), /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, breakdown && /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-x-2 gap-y-0.5 mb-1 border-b border-white/5 pb-1" }, breakdown.map((item, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "flex items-center gap-0.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[8px] font-medium text-slate-500" }, item.label), /* @__PURE__ */ React.createElement("span", { className: "text-[8px] font-bold text-slate-300" }, formatNumberWithCommas(Math.abs(item.value)))))), /* @__PURE__ */ React.createElement("h3", { className: `text-2xl font-extrabold tracking-tight ${valueColor} truncate font-grotesk` }, formatCurrency(value))));
};
const AnnualStockCard = ({ profit, dividend, year }) => /* @__PURE__ */ React.createElement(GlassCard, { className: "p-3 flex flex-col justify-center h-full min-h-[90px] relative overflow-hidden group hover:-translate-y-1 transition-transform" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "p-1 rounded bg-white/5 text-indigo-400" }, /* @__PURE__ */ React.createElement(Icons.Calendar, { className: "w-3.5 h-3.5" })), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest font-grotesk" }, year, " ANNUAL PERFORMANCE")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-1 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-500 font-grotesk" }, "Realized Profit"), /* @__PURE__ */ React.createElement("span", { className: `font-mono font-bold ${profit >= 0 ? "text-rose-400" : "text-blue-400"}` }, formatCurrency(profit))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-500 font-grotesk" }, "Dividends"), /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-emerald-400" }, formatCurrency(dividend))), /* @__PURE__ */ React.createElement("div", { className: "w-full h-px bg-white/5 my-1" }), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-indigo-400 font-grotesk" }, "Total"), /* @__PURE__ */ React.createElement("span", { className: `font-mono font-black ${profit + dividend >= 0 ? "text-rose-400" : "text-blue-400"}` }, formatCurrency(profit + dividend)))));
const AIAnalysisCard = ({ assets, liabilities, netWorth, income, expense, year, data, isWrapped }) => {
  const isCapitalImpairment = netWorth <= 0 && liabilities > 0;
  const debtRatio = netWorth > 0 ? liabilities / netWorth * 100 : liabilities > 0 ? 999 : 0;
  const savingsRate = income > 0 ? (income - expense) / income * 100 : 0;
  let assetStatus = "Stable", assetColor = "text-emerald-400", assetBg = "bg-emerald-500";
  if (isCapitalImpairment || debtRatio > 40) {
    assetStatus = "Critical";
    assetColor = "text-rose-400";
    assetBg = "bg-rose-500";
  } else if (debtRatio > 20) {
    assetStatus = "Warning";
    assetColor = "text-amber-400";
    assetBg = "bg-amber-500";
  }
  let budgetStatus = "Good", budgetColor = "text-emerald-400", budgetBg = "bg-emerald-500";
  if (income === 0) {
    budgetStatus = "No Data";
    budgetColor = "text-slate-500";
    budgetBg = "bg-slate-500";
  } else if (savingsRate < 0) {
    budgetStatus = "Deficit";
    budgetColor = "text-rose-400";
    budgetBg = "bg-rose-500";
  } else if (savingsRate < 20) {
    budgetStatus = "Low";
    budgetColor = "text-amber-400";
    budgetBg = "bg-amber-500";
  }
  let adviceTitle = "Stable Asset Management";
  let adviceDetail = "Your debt ratio and savings rate are healthy. Maintain this stance and increase investments.";
  if (assetStatus === "Critical") {
    adviceTitle = "Urgent Restructuring Required";
    adviceDetail = "Debt ratio is critical. Minimize fixed costs and prioritize debt repayment.";
  } else if (budgetStatus === "Deficit") {
    adviceTitle = "Expense Control Required";
    adviceDetail = "Expenses exceed income. Review unnecessary spending and rebuild your budget.";
  } else if (assetStatus === "Warning" || budgetStatus === "Low") {
    adviceTitle = "Additional Effort Recommended";
    adviceDetail = "Increasing your savings rate or further reducing debt will enhance financial stability.";
  }
  const content = /* @__PURE__ */ React.createElement("div", { className: `relative overflow-hidden ${isWrapped ? "" : "bg-gradient-to-br from-cyan-950/60 to-indigo-950/60 border border-cyan-500/20 text-white rounded-2xl shadow-xl p-4 sm:p-5 group transition-all hover:shadow-2xl hover:scale-[1.01]"} h-full flex flex-col` }, !isWrapped && /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" }), !isWrapped && /* @__PURE__ */ React.createElement("div", { className: "relative z-10 flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "p-1.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-inner" }, /* @__PURE__ */ React.createElement(Icons.Sparkles, { className: "w-4 h-4 text-yellow-300 animate-pulse" })), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-base tracking-tight leading-none font-grotesk" }, "AI Asset Advisor")), /* @__PURE__ */ React.createElement("div", { className: "px-2 py-0.5 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-wider text-indigo-200 font-grotesk" }, "Beta")), /* @__PURE__ */ React.createElement("div", { className: `relative z-10 flex-1 flex flex-col min-h-0 ${isWrapped ? "text-slate-200" : "text-white"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: `text-2xl font-black ${isWrapped ? "text-indigo-400" : "text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300"} leading-none font-grotesk` }, isCapitalImpairment ? 0 : Math.max(0, 100 - debtRatio * 0.5 + savingsRate * 0.5).toFixed(0)), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-bold ${isWrapped ? "text-slate-500" : "text-indigo-300"} leading-tight uppercase tracking-wider font-grotesk` }, "Health Score")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-2" }, /* @__PURE__ */ React.createElement("div", { className: `${isWrapped ? "bg-black/40" : "bg-black/20"} rounded-lg p-2 backdrop-blur-sm border border-white/5` }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1" }, /* @__PURE__ */ React.createElement("span", { className: `text-[8px] ${isWrapped ? "text-slate-500" : "text-indigo-300"} font-bold uppercase tracking-wider` }, "Debt Ratio"), /* @__PURE__ */ React.createElement("span", { className: `text-[8px] font-bold px-1 py-0.5 rounded ${assetStatus === "Stable" ? "bg-emerald-500/20 text-emerald-400" : assetStatus === "Warning" ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/20 text-rose-400"}` }, assetStatus)), /* @__PURE__ */ React.createElement("div", { className: "flex items-end gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-white leading-tight font-grotesk" }, isCapitalImpairment ? "Impaired" : debtRatio.toFixed(1) + "%")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/10 w-full h-1 rounded-full mt-1.5 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: `h-full rounded-full transition-all duration-1000 ${assetBg}`, style: { width: `${Math.min(debtRatio, 100)}%` } }))), /* @__PURE__ */ React.createElement("div", { className: `${isWrapped ? "bg-black/40" : "bg-black/20"} rounded-lg p-2 backdrop-blur-sm border border-white/5` }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1" }, /* @__PURE__ */ React.createElement("span", { className: `text-[8px] ${isWrapped ? "text-slate-500" : "text-indigo-300"} font-bold uppercase tracking-wider` }, "Savings"), /* @__PURE__ */ React.createElement("span", { className: `text-[8px] font-bold px-1 py-0.5 rounded ${budgetStatus === "Good" ? "bg-emerald-500/20 text-emerald-400" : budgetStatus === "Deficit" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"}` }, budgetStatus)), /* @__PURE__ */ React.createElement("div", { className: "flex items-end gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-white leading-tight font-grotesk" }, savingsRate.toFixed(1), "%")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/10 w-full h-1 rounded-full mt-1.5 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: `h-full rounded-full transition-all duration-1000 ${budgetBg}`, style: { width: `${Math.min(Math.max(0, savingsRate), 100)}%` } })))), /* @__PURE__ */ React.createElement("div", { className: "mt-auto pt-3" }, /* @__PURE__ */ React.createElement("div", { className: `${isWrapped ? "bg-indigo-950/40 border-indigo-500/20" : "bg-white/5 border-white/5"} backdrop-blur-md rounded-xl px-2.5 py-2 border shadow-sm flex items-start gap-2`, title: `${adviceTitle} ${adviceDetail}` }, /* @__PURE__ */ React.createElement("div", { className: "w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-1" }), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-white font-bold leading-tight truncate" }, adviceTitle), /* @__PURE__ */ React.createElement("p", { className: "text-[9px] text-slate-400 leading-tight mt-0.5 line-clamp-2" }, adviceDetail))))));
  return content;
};
const MemoCard = ({ memo, onUpdate, isWrapped }) => {
  const [text, setText] = useState(memo || "");
  useEffect(() => {
    setText(memo || "");
  }, [memo]);
  const handleBlur = () => {
    if (text !== memo) onUpdate(text);
  };
  const content = /* @__PURE__ */ React.createElement("div", { className: "flex flex-col h-full" }, !isWrapped && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-3 text-slate-400 font-bold text-sm" }, /* @__PURE__ */ React.createElement(Icons.Edit2, { className: "w-4 h-4" }), " Console Memo"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      className: "flex-1 w-full bg-black/35 border border-white/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400/50 outline-none resize-none transition-all custom-scrollbar placeholder:text-slate-600 text-slate-200",
      placeholder: "Write down notes here...",
      value: text,
      onChange: (e) => setText(e.target.value),
      onBlur: handleBlur
    }
  ));
  return isWrapped ? content : /* @__PURE__ */ React.createElement(GlassCard, { className: "p-5 h-full" }, content);
};
const MonthlyAssetAllocationCard = ({ date, data, isWrapped }) => {
  const allocationPlan = [
    {
      label: "Stocks",
      targetRatio: 37,
      color: "#818cf8",
      bgColor: "bg-indigo-500/10",
      textColor: "text-indigo-400",
      borderColor: "border-indigo-500/20",
      getActual: (budget) => budget.filter((b) => ["INVEST", "SAVING"].includes(normalizeCategory(b.category, "budget")) && !isItemHidden(b, "budget", data.meta) && ["\uC735\uAE30", "\uC218\uC544", "Yungki", "Sua"].includes((b.category2 || "").trim()) && b.name && (b.name.includes("\uD1A0\uC2A4 \uC8FC\uC2DD") || b.name.toLowerCase().includes("toss stock") || b.name.includes("ISA"))).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0)
    },
    {
      label: "Crypto",
      targetRatio: 3,
      color: "#f59e0b",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-400",
      borderColor: "border-amber-500/20",
      getActual: (budget) => budget.filter((b) => normalizeCategory(b.category, "budget") === "INVEST" && !isItemHidden(b, "budget", data.meta) && b.name && (b.name.replace(/\s/g, "").includes("\uCF54\uC778") || b.name.toLowerCase().includes("coin") || b.name.toLowerCase().includes("crypto"))).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0)
    },
    {
      label: "Loan Repayment",
      targetRatio: 8,
      color: "#f43f5e",
      bgColor: "bg-rose-500/10",
      textColor: "text-rose-400",
      borderColor: "border-rose-500/20",
      getActual: (budget) => budget.filter((b) => normalizeCategory(b.category, "budget") === "EXPENSE" && !isItemHidden(b, "budget", data.meta) && b.name && ["\uB300\uCD9C\uC0C1\uD658", "loanrepayment", "loanrepay"].includes(b.name.replace(/\s/g, "").toLowerCase())).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0)
    },
    {
      label: "Credit Cards",
      targetRatio: 20,
      isLimit: true,
      color: "#06b6d4",
      bgColor: "bg-cyan-500/10",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-500/20",
      getActual: (budget) => budget.filter((b) => normalizeCategory(b.category, "budget") === "EXPENSE" && !isItemHidden(b, "budget", data.meta) && ["\uC735\uAE30", "\uC218\uC544", "Yungki", "Sua"].includes((b.category2 || "").trim()) && b.name && (b.name.includes("\uC2E0\uC6A9\uCE74\uB4DC") || b.name.toLowerCase().includes("creditcard") || b.name.toLowerCase().includes("credit card"))).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0)
    }
  ];
  const stats = useMemo(() => {
    const budget = data[date]?.budget || [];
    const income = budget.filter((b) => normalizeCategory(b.category, "budget") === "INCOME" && !isItemHidden(b, "budget", data.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
    const items = allocationPlan.map((plan) => {
      const targetAmt = income * (plan.targetRatio / 100);
      const actualAmt = plan.getActual(budget);
      const achieved = income > 0 && (plan.isLimit ? actualAmt <= targetAmt : actualAmt >= targetAmt);
      const progress = targetAmt > 0 ? Math.min(actualAmt / targetAmt * 100, 100) : actualAmt > 0 ? 100 : 0;
      const actualRatio = income > 0 ? actualAmt / income * 100 : 0;
      return { ...plan, income, targetAmt, actualAmt, achieved, progress, actualRatio };
    });
    const year = date.substring(0, 4);
    const yearlyAchieved = Array.from({ length: 12 }, (_, i) => {
      const monthKey = `${year}-${String(i + 1).padStart(2, "0")}`;
      const mBudget = data[monthKey]?.budget || [];
      const mIncome = mBudget.filter((b) => normalizeCategory(b.category, "budget") === "INCOME" && !isItemHidden(b, "budget", data.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
      if (mIncome <= 0) return { month: i + 1, achieved: false, hasData: false };
      const allAchieved = allocationPlan.every((plan) => {
        const targetAmt = mIncome * (plan.targetRatio / 100);
        const actualAmt = plan.getActual(mBudget);
        return plan.isLimit ? actualAmt <= targetAmt : actualAmt >= targetAmt;
      });
      return { month: i + 1, achieved: allAchieved, hasData: true };
    });
    return { income, items, yearlyAchieved, year };
  }, [date, data]);
  const content = /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col min-h-0 w-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2 px-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "w-1.5 h-3.5 rounded-full bg-emerald-400" }), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-slate-400" }, "Income Total (This Month)")), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-black text-emerald-400" }, formatCurrency(stats.income))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, stats.items.map((item, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: `rounded-xl border ${item.borderColor} ${item.bgColor} px-2.5 py-2` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "w-1.5 h-1.5 rounded-full flex-shrink-0", style: { backgroundColor: item.color } }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-300" }, item.label), /* @__PURE__ */ React.createElement("span", { className: `text-[8px] font-bold px-1 py-0.5 rounded-full ${item.textColor} bg-white/5 border border-white/10` }, "Target ", item.targetRatio, "%")), /* @__PURE__ */ React.createElement("div", { className: `flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${item.achieved ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : item.isLimit ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-white/5 text-slate-400 border border-white/10"}` }, item.achieved ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("svg", { className: "w-2 h-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" })), "Achieved") : /* @__PURE__ */ React.createElement(React.Fragment, null, item.isLimit ? "Over Limit" : "In Progress"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 mb-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 bg-white/5 rounded-full h-1 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "h-full rounded-full transition-all duration-700", style: { width: `${item.progress}%`, backgroundColor: item.color } })), /* @__PURE__ */ React.createElement("span", { className: "text-[8px] font-mono text-slate-500 w-6 text-right" }, item.progress.toFixed(0), "%")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[8px] text-slate-500" }, "Target"), /* @__PURE__ */ React.createElement("span", { className: "text-[9px] font-bold text-slate-300" }, formatCurrency(item.targetAmt))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[8px] text-slate-500" }, "Actual"), /* @__PURE__ */ React.createElement("span", { className: `text-[9px] font-bold ${item.achieved ? "text-emerald-400" : item.textColor}` }, formatCurrency(item.actualAmt)), /* @__PURE__ */ React.createElement("span", { className: "text-[8px] text-slate-500" }, "(", item.actualRatio.toFixed(1), "%)")))))), /* @__PURE__ */ React.createElement("div", { className: "mt-2 pt-2 border-t border-white/10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1.5 px-0.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[9px] font-bold text-slate-400" }, stats.year, " Achievement Tracker"), /* @__PURE__ */ React.createElement("span", { className: "text-[8px] text-slate-500" }, stats.yearlyAchieved.filter((m) => m.achieved).length, " / 12 months")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-12 gap-1" }, stats.yearlyAchieved.map((m) => {
    const isCurrentMonth = date === `${stats.year}-${String(m.month).padStart(2, "0")}`;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: m.month,
        title: `Month ${m.month}: ${m.achieved ? "\u2713 Achieved" : m.hasData ? "Not Achieved" : "No Data"}`,
        className: `h-6 rounded flex flex-col items-center justify-center transition-all duration-300
                                            ${m.achieved ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : m.hasData ? "bg-white/5 border border-white/10 text-slate-400" : "bg-transparent border border-dashed border-white/5 text-slate-600"}
                                            ${isCurrentMonth ? "ring-1 ring-cyan-400 ring-offset-1 ring-offset-[#0a0b16]" : ""}
                                        `
      },
      /* @__PURE__ */ React.createElement("span", { className: `text-[7px] font-bold leading-none ${m.achieved ? "text-emerald-400" : "text-slate-500"}` }, m.month)
    );
  }))));
  return isWrapped ? content : /* @__PURE__ */ React.createElement(GlassCard, { className: "w-full p-5 h-full flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-sky-500/10 text-sky-400" }, /* @__PURE__ */ React.createElement(Icons.PieChart, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-bold text-slate-200" }, "Asset Allocation Strategy"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-500 font-medium" }, "As of ", date)))), content);
};
const MonthlyAssetRatioCard = MonthlyAssetAllocationCard;
const FinancialGoalCombinedCard = ({ year, data, loanGoal, investGoal, onGoalChange, isWrapped }) => {
  const loanStats = useMemo(() => {
    let totalIncome = 0, actualRepayment = 0;
    for (let m = 1; m <= 12; m++) {
      const monthKey = `${year}-${String(m).padStart(2, "0")}`;
      const monthData = data[monthKey];
      if (monthData && monthData.budget) {
        if ([3, 6, 9, 12].includes(m)) {
          totalIncome += monthData.budget.filter((b) => normalizeCategory(b.category, "budget") === "INCOME" && !isItemHidden(b, "budget", data.meta)).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        }
        const repaymentItem = monthData.budget.find((b) => ["\uB300\uCD9C\uC0C1\uD658", "loanrepayment", "loanrepay"].includes(b.name.replace(/\s/g, "").toLowerCase()) && !isItemHidden(b, "budget", data.meta));
        if (repaymentItem) actualRepayment += Number(repaymentItem.amount) || 0;
      }
    }
    return { required: totalIncome * (loanGoal / 100), actual: actualRepayment };
  }, [year, data, loanGoal]);
  const investStats = useMemo(() => {
    let totalIncome = 0, actualInvest = 0;
    for (let m = 1; m <= 12; m++) {
      const monthKey = `${year}-${String(m).padStart(2, "0")}`;
      const monthData = data[monthKey];
      if (monthData && monthData.budget) {
        totalIncome += monthData.budget.filter((b) => normalizeCategory(b.category, "budget") === "INCOME" && !isItemHidden(b, "budget", data.meta)).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        actualInvest += monthData.budget.filter((b) => normalizeCategory(b.category, "budget") === "INVEST" && !isItemHidden(b, "budget", data.meta)).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
      }
    }
    return { target: totalIncome * (investGoal / 100), actual: actualInvest };
  }, [year, data, investGoal]);
  const loanProgress = loanStats.required > 0 ? Math.min(loanStats.actual / loanStats.required * 100, 100) : 0;
  const investProgress = investStats.target > 0 ? Math.min(investStats.actual / investStats.target * 100, 100) : 0;
  const content = /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6" }, !isWrapped && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20" }, /* @__PURE__ */ React.createElement(Icons.Target, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-bold text-slate-200" }, year, " Key Financial Goals Status")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-end" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-500 uppercase tracking-widest font-grotesk" }, "Loan Repayment Status"), /* @__PURE__ */ React.createElement("h3", { className: `text-2xl font-black mt-1 font-grotesk ${loanStats.actual >= loanStats.required ? "text-emerald-400" : "text-slate-300"}` }, formatCurrency(loanStats.actual))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-bold px-2.5 py-1 rounded-full ${loanStats.actual >= loanStats.required ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-slate-400 border border-white/10"}` }, loanStats.actual >= loanStats.required ? "Achieved" : "In Progress"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    const val = prompt("Loan Repayment Target Ratio (%)", loanGoal);
    if (val) onGoalChange("loan", Number(val));
  }, className: "p-1.5 text-slate-400 hover:text-cyan-400 transition-colors bg-white/5 border border-white/10 rounded-lg hover:bg-cyan-500/10" }, /* @__PURE__ */ React.createElement(Icons.Settings, { className: "w-4 h-4" })))), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-white/5 rounded-full h-3 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: `h-full transition-all duration-1000 ${loanStats.actual >= loanStats.required ? "bg-emerald-500" : "bg-indigo-500"}`, style: { width: `${loanProgress}%` } })), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[10px] font-bold" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "Repayment Target ", loanGoal, "% of Bonus (", formatCurrency(loanStats.required), ")"), /* @__PURE__ */ React.createElement("span", { className: "text-slate-400" }, loanProgress.toFixed(1), "%"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-end" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-500 uppercase tracking-widest font-grotesk" }, "Cumulative Investment Status"), /* @__PURE__ */ React.createElement("h3", { className: `text-2xl font-black mt-1 font-grotesk ${investStats.actual >= investStats.target ? "text-emerald-400" : "text-slate-300"}` }, formatCurrency(investStats.actual))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-bold px-2.5 py-1 rounded-full ${investStats.actual >= investStats.target ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-slate-400 border border-white/10"}` }, investStats.actual >= investStats.target ? "Achieved" : "In Progress"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    const val = prompt("Investment Target Ratio (%)", investGoal);
    if (val) onGoalChange("invest", Number(val));
  }, className: "p-1.5 text-slate-400 hover:text-cyan-400 transition-colors bg-white/5 border border-white/10 rounded-lg hover:bg-cyan-500/10" }, /* @__PURE__ */ React.createElement(Icons.Settings, { className: "w-4 h-4" })))), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-white/5 rounded-full h-3 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: `h-full transition-all duration-1000 ${investStats.actual >= investStats.target ? "bg-emerald-500" : "bg-indigo-500"}`, style: { width: `${investProgress}%` } })), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[10px] font-bold" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "Investment Target ", investGoal, "% of Income (", formatCurrency(investStats.target), ")"), /* @__PURE__ */ React.createElement("span", { className: "text-slate-400" }, investProgress.toFixed(1), "%")))));
  return isWrapped ? content : /* @__PURE__ */ React.createElement(GlassCard, { className: "p-6" }, content);
};
const NetWorthGoalCard = ({ netWorth, onGoalChange, targetAmount }) => {
  const progress = targetAmount > 0 ? Math.min(netWorth / targetAmount * 100, 100) : 0;
  const isSuccess = netWorth >= targetAmount;
  return /* @__PURE__ */ React.createElement(GlassCard, { className: "p-5 h-full flex flex-col justify-center relative" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-lg ${isSuccess ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-[#0f1026] text-cyan-400 border border-cyan-500/20"}` }, /* @__PURE__ */ React.createElement(Icons.Flag, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-bold text-slate-200" }, "Net Worth Target (FIRE)"))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    const newGoal = prompt("Enter target net worth (KRW):", targetAmount);
    if (newGoal !== null && !isNaN(newGoal)) onGoalChange(Number(newGoal));
  }, className: "text-slate-400 hover:text-cyan-400" }, /* @__PURE__ */ React.createElement(Icons.Settings, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-white/5 rounded-full h-2.5 mb-4 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: `h-2.5 rounded-full transition-all duration-1000 ${isSuccess ? "bg-emerald-500" : "bg-cyan-500"}`, style: { width: `${progress}%` } })), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-xs mt-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1" }, "Progress"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-300 font-grotesk" }, progress.toFixed(1), "%")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-end" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1" }, "Target"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-cyan-400 font-grotesk" }, formatCurrency(targetAmount)))));
};
const YearlyRatioCard = ({ year, data, isWrapped }) => {
  const [activeItem, setActiveIndex] = useState(null);
  const stats = useMemo(() => {
    let totalIncome = 0, totalExpense = 0, totalSaving = 0, totalInvest = 0;
    const months = Object.keys(data).filter((k) => k.startsWith(year));
    months.forEach((m) => {
      const budget = data[m]?.budget || [];
      totalIncome += budget.filter((b) => normalizeCategory(b.category, "budget") === "INCOME" && !isItemHidden(b, "budget", data.meta)).reduce((a, b) => a + (Number(b.amount) || 0), 0);
      totalExpense += budget.filter((b) => normalizeCategory(b.category, "budget") === "EXPENSE" && !isItemHidden(b, "budget", data.meta)).reduce((a, b) => a + (Number(b.amount) || 0), 0);
      totalSaving += budget.filter((b) => normalizeCategory(b.category, "budget") === "SAVING" && !isItemHidden(b, "budget", data.meta)).reduce((a, b) => a + (Number(b.amount) || 0), 0);
      totalInvest += budget.filter((b) => normalizeCategory(b.category, "budget") === "INVEST" && !isItemHidden(b, "budget", data.meta)).reduce((a, b) => a + (Number(b.amount) || 0), 0);
    });
    return { totalIncome, totalExpense, totalSaving, totalInvest };
  }, [year, data]);
  const getPercent = (val) => stats.totalIncome > 0 ? val / stats.totalIncome * 100 : 0;
  const items = [{ label: "Expenses", value: stats.totalExpense, color: "#fb7185", percent: getPercent(stats.totalExpense) }, { label: "Savings", value: stats.totalSaving, color: "#34d399", percent: getPercent(stats.totalSaving) }, { label: "Investment", value: stats.totalInvest, color: "#818cf8", percent: getPercent(stats.totalInvest) }];
  const content = /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex items-center gap-2 min-h-0 w-full h-full p-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-2/5 h-full relative" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(Pie, { data: items, cx: "50%", cy: "50%", innerRadius: "60%", outerRadius: "90%", paddingAngle: 2, dataKey: "value", cornerRadius: 3, onMouseEnter: (_, index) => setActiveIndex(index), onMouseLeave: () => setActiveIndex(null), activeIndex: activeItem === null ? -1 : activeItem, activeShape: renderActiveShape }, items.map((entry, index) => /* @__PURE__ */ React.createElement(Cell, { key: `cell-${index}`, fill: entry.color, stroke: "none" })))))), /* @__PURE__ */ React.createElement("div", { className: "w-3/5 h-full flex flex-col justify-center pr-1 overflow-y-auto custom-scrollbar" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, items.map((entry, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: `flex justify-between items-center text-[10px] p-1 rounded transition-colors ${activeItem === index ? "bg-white/5" : ""}`, onMouseEnter: () => setActiveIndex(index), onMouseLeave: () => setActiveIndex(null) }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { backgroundColor: entry.color } }), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-400 truncate", title: entry.label }, entry.label)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 flex-shrink-0" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-300 font-grotesk" }, formatCurrency(entry.value)), /* @__PURE__ */ React.createElement("span", { className: "text-slate-500 font-mono w-10 text-right font-grotesk" }, entry.percent.toFixed(1), "%")))))));
  return isWrapped ? content : /* @__PURE__ */ React.createElement(GlassCard, { className: "w-full p-5 h-full flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" }, /* @__PURE__ */ React.createElement(Icons.PieChart, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-bold text-slate-200" }, year, " Cumulative Ratio"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-500 font-medium" }, "Annual Total")))), content);
};
const CombinedAssetTelemetry = ({ totalAssets, liquidAssets, liabilities, prevTotalAssets, calcYoY }) => {
  const stakedAssets = Math.max(0, totalAssets - liquidAssets);
  const yoy = calcYoY(totalAssets, prevTotalAssets);
  let trendColor = "text-slate-400", trendBg = "bg-white/5", TrendIcon = Icons.TrendingUp;
  if (yoy > 0) {
    trendColor = "text-cyan-400";
    trendBg = "bg-cyan-500/10";
    TrendIcon = Icons.TrendingUp;
  } else if (yoy < 0) {
    trendColor = "text-blue-400";
    trendBg = "bg-blue-500/10";
    TrendIcon = Icons.TrendingDown;
  }
  const formatAbbr = (val) => {
    if (typeof val !== "number" || isNaN(val)) return "\u20A9 0.0M";
    return `\u20A9 ${(val / 1e6).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
  };
  return /* @__PURE__ */ React.createElement("div", { className: "relative overflow-hidden bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between w-full h-full shadow-xl shadow-black/20 group" }, /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-0 w-32 h-32 opacity-25 pointer-events-none transition-transform duration-700 group-hover:scale-105" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", className: "w-full h-full text-cyan-400/30" }, /* @__PURE__ */ React.createElement("circle", { cx: "100", cy: "0", r: "80", fill: "none", stroke: "currentColor", strokeDasharray: "3,3", strokeWidth: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "100", cy: "0", r: "60", fill: "none", stroke: "currentColor", strokeWidth: "0.75" }), /* @__PURE__ */ React.createElement("circle", { cx: "100", cy: "0", r: "40", fill: "none", stroke: "currentColor", strokeDasharray: "5,5", strokeWidth: "0.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "100", cy: "0", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "0.5" }))), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-cyan-400 tracking-[0.2em] font-grotesk uppercase" }, "PORTFOLIO_AGGREGATED_WORTH"), yoy !== 0 && /* @__PURE__ */ React.createElement("div", { className: `inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-full ${trendBg} ${trendColor} border border-current/10 font-mono` }, /* @__PURE__ */ React.createElement(TrendIcon, { className: "w-2.5 h-2.5 mr-0.5" }), "YoY ", Math.abs(yoy).toFixed(1), "%")), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-grotesk" }, "\u20A9 ", new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(totalAssets))), /* @__PURE__ */ React.createElement("div", { className: "w-full h-px bg-white/10 my-2" }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4 pt-1" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "block text-[9px] font-bold text-slate-500 uppercase tracking-widest font-grotesk" }, "Liquid Value"), /* @__PURE__ */ React.createElement("span", { className: "text-base sm:text-lg font-black text-slate-200 mt-1 font-grotesk block truncate" }, formatAbbr(liquidAssets))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "block text-[9px] font-bold text-slate-500 uppercase tracking-widest font-grotesk" }, "Staked Assets"), /* @__PURE__ */ React.createElement("span", { className: "text-base sm:text-lg font-black text-slate-200 mt-1 font-grotesk block truncate" }, formatAbbr(stakedAssets))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "block text-[9px] font-bold text-slate-500 uppercase tracking-widest font-grotesk" }, "Active Debt"), /* @__PURE__ */ React.createElement("span", { className: "text-base sm:text-lg font-black text-rose-400 mt-1 font-grotesk block truncate" }, formatAbbr(liabilities))))));
};
const Dashboard = ({ data = {}, onUpdate, viewDate: viewDateProp, setViewDate: setViewDateProp }) => {
  const safeData = data || {};
  const allMonths = Object.keys(safeData).filter(isMonthKey).sort();
  const [viewDateLocal, setViewDateLocal] = useState(() => {
    const today = /* @__PURE__ */ new Date();
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
    return allMonths.includes(key) ? key : allMonths[allMonths.length - 1] || "2024-01";
  });
  const viewDate = viewDateProp !== void 0 ? viewDateProp : viewDateLocal;
  const setViewDate = setViewDateProp !== void 0 ? setViewDateProp : setViewDateLocal;
  const viewYear = viewDate.split("-")[0];
  const todayStr = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const currentData = safeData[viewDate] || { assets: [], loans: [], budget: [], stockProfit: [] };
  const prevYearDate = getPreviousMonth(viewDate);
  const prevYearData = safeData[prevYearDate] || null;
  const reStats = useMemo(() => {
    const list = safeData.realEstate || [];
    return {
      totalValue: list.reduce((acc, item) => acc + (evaluateFormula(item.currentValue) || 0), 0),
      totalDebt: list.reduce((acc, item) => acc + (evaluateFormula(item.loan) || 0) + (evaluateFormula(item.deposit) || 0), 0),
      ownedDebt: list.filter((item) => item.ownershipType === "OWN" || !item.ownershipType).reduce((acc, item) => acc + (evaluateFormula(item.loan) || 0) + (evaluateFormula(item.deposit) || 0), 0)
    };
  }, [safeData.realEstate]);
  const assetBreakdown = Object.keys(ASSET_CATEGORIES).map((catKey) => {
    let sum = (currentData.assets || []).filter((a) => normalizeCategory(a.category, "assets") === catKey && !isItemHidden(a, "assets", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.value) || 0), 0);
    if (catKey === "REAL_ESTATE") sum += reStats.totalValue;
    return { label: ASSET_CATEGORIES[catKey].label, value: sum };
  }).filter((i) => i.value > 0);
  const totalAssets = (currentData.assets || []).filter((a) => !isItemHidden(a, "assets", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.value) || 0), 0) + reStats.totalValue;
  const prevTotalAssets = prevYearData ? (prevYearData.assets || []).filter((a) => !isItemHidden(a, "assets", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.value) || 0), 0) + reStats.totalValue : totalAssets;
  const liabilitiesExclJeonse = (currentData.loans || []).filter((l) => normalizeCategory(l.category, "loans") !== "LEASE" && !isItemHidden(l, "loans", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.amount) || 0), 0) + reStats.ownedDebt;
  const prevLiabilities = prevYearData ? (prevYearData.loans || []).filter((l) => normalizeCategory(l.category, "loans") !== "LEASE" && !isItemHidden(l, "loans", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.amount) || 0), 0) + reStats.ownedDebt : liabilitiesExclJeonse;
  const netWorth = totalAssets - liabilitiesExclJeonse;
  const prevNetWorth = prevTotalAssets - prevLiabilities;
  const calcYoY = (curr, prev) => prev && prev !== 0 ? (curr - prev) / prev * 100 : 0;
  const totalStockAssets = (currentData.assets || []).filter((a) => normalizeCategory(a.category, "assets") === "INVESTMENT" && !isItemHidden(a, "assets", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.value) || 0), 0);
  const prevTotalStockAssets = prevYearData ? (prevYearData.assets || []).filter((a) => normalizeCategory(a.category, "assets") === "INVESTMENT" && !isItemHidden(a, "assets", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.value) || 0), 0) : 0;
  const liquidAssets = (currentData.assets || []).filter((a) => normalizeCategory(a.category, "assets") === "SAVINGS" && !isItemHidden(a, "assets", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.value) || 0), 0);
  const monthlyExpense = (currentData.budget || []).filter((b) => normalizeCategory(b.category, "budget") === "EXPENSE" && !isItemHidden(b, "budget", safeData.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
  const emergencyIndex = monthlyExpense > 0 ? (liquidAssets / monthlyExpense).toFixed(1) : "\u221E";
  const annualData = useMemo(() => {
    const months = allMonths.filter((m) => m.startsWith(viewYear));
    let profit = 0, dividend = 0;
    months.forEach((m) => {
      const d = safeData[m]?.stockProfit || [];
      profit += d.filter((i) => i.category === "STOCK_PROFIT" && !isItemHidden(i, "stockProfit", safeData.meta)).reduce((sum, i) => sum + (evaluateFormula(i.profit) || 0), 0);
      dividend += d.filter((i) => i.category === "DIVIDEND" && !isItemHidden(i, "stockProfit", safeData.meta)).reduce((sum, i) => sum + (evaluateFormula(i.dividend) || 0), 0);
    });
    return { profit, dividend, year: viewYear };
  }, [safeData, viewYear, allMonths]);
  const totalIncome = (currentData.budget || []).filter((b) => normalizeCategory(b.category, "budget") === "INCOME" && !isItemHidden(b, "budget", data.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
  const totalExpense = (currentData.budget || []).filter((b) => normalizeCategory(b.category, "budget") === "EXPENSE" && !isItemHidden(b, "budget", data.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
  const fullGrowthData = allMonths.map((month) => {
    const d = safeData[month];
    const assets = (d?.assets || []).filter((a) => !isItemHidden(a, "assets", safeData.meta)).reduce((a, b) => a + (evaluateFormula(b.value) || 0), 0);
    const loans = (d?.loans || []).filter((l) => normalizeCategory(l.category, "loans") !== "LEASE" && !isItemHidden(l, "loans", safeData.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
    const netAssets = assets - loans;
    let dr = 0;
    if (netAssets <= 0) {
      dr = loans > 0 ? 100 : 0;
    } else {
      dr = Math.min(loans / netAssets * 100, 100);
    }
    return { name: month, assets, netWorth: netAssets, debtRatio: parseFloat(dr.toFixed(1)) };
  });
  const recentMonths = allMonths.slice(Math.max(0, allMonths.indexOf(viewDate) - 11), allMonths.indexOf(viewDate) + 1);
  const assetGrowthData = recentMonths.map((month) => {
    const d = safeData[month];
    const result = { name: month };
    Object.keys(ASSET_CATEGORIES).forEach((key) => {
      result[ASSET_CATEGORIES[key].label] = (d?.assets || []).filter((a) => normalizeCategory(a.category, "assets") === key && !isItemHidden(a, "assets", safeData.meta)).reduce((acc, cur) => acc + (evaluateFormula(cur.value) || 0), 0);
    });
    return result;
  });
  const cashFlowData = recentMonths.map((month) => {
    const d = safeData[month];
    const income = (d?.budget || []).filter((b) => normalizeCategory(b.category, "budget") === "INCOME" && !isItemHidden(b, "budget", safeData.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
    const expense = (d?.budget || []).filter((b) => normalizeCategory(b.category, "budget") === "EXPENSE" && !isItemHidden(b, "budget", safeData.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
    const saving = (d?.budget || []).filter((b) => normalizeCategory(b.category, "budget") === "SAVING" && !isItemHidden(b, "budget", safeData.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
    const invest = (d?.budget || []).filter((b) => normalizeCategory(b.category, "budget") === "INVEST" && !isItemHidden(b, "budget", safeData.meta)).reduce((a, b) => a + (evaluateFormula(b.amount) || 0), 0);
    return {
      name: month,
      income,
      expenses: expense,
      savings: saving,
      investment: invest,
      savingsRate: income > 0 ? parseFloat(((income - expense) / income * 100).toFixed(1)) : 0,
      investmentShare: income > 0 ? parseFloat((invest / income * 100).toFixed(1)) : 0
    };
  });
  const portfolioData = Object.keys(ASSET_CATEGORIES).map((catKey) => {
    const categoryItems = (currentData.assets || []).filter((a) => normalizeCategory(a.category, "assets") === catKey && !isItemHidden(a, "assets", safeData.meta));
    let val = categoryItems.reduce((a, b) => a + (evaluateFormula(b.value) || 0), 0);
    if (catKey === "REAL_ESTATE") val += reStats.totalValue;
    return { name: ASSET_CATEGORIES[catKey].label, value: val, color: ASSET_CATEGORIES[catKey].color };
  }).filter((i) => i.value > 0);
  const [activeItem, setActiveIndex] = useState(null);
  const updateGoal = (type, value) => {
    const newData = JSON.parse(JSON.stringify(safeData));
    if (!newData.meta) newData.meta = {};
    if (!newData.meta.goals) newData.meta.goals = { loan: 30, invest: 30, netWorth: 1e9 };
    newData.meta.goals[type] = value;
    onUpdate(newData);
  };
  const loanGoal = safeData.meta?.goals?.loan || 30;
  const investGoal = safeData.meta?.goals?.invest || 30;
  const netWorthGoal = safeData.meta?.goals?.netWorth || 1e9;
  const handleMonthChange = (direction) => {
    const idx = allMonths.indexOf(viewDate);
    if (idx === -1) return;
    const newIdx = idx + direction;
    if (newIdx >= 0 && newIdx < allMonths.length) setViewDate(allMonths[newIdx]);
  };
  const renderScoreCard = (id) => {
    switch (id) {
      case "total":
        return /* @__PURE__ */ React.createElement(CompactScoreCard, { title: "Total Assets", value: totalAssets, yoy: calcYoY(totalAssets, prevTotalAssets), icon: Icons.Wallet, breakdown: assetBreakdown });
      case "net":
        return /* @__PURE__ */ React.createElement(CompactScoreCard, { title: "Net Worth", value: netWorth, yoy: calcYoY(netWorth, prevNetWorth), icon: Icons.Sparkles, colorClass: "text-emerald-400", breakdown: [{ label: "Total Assets", value: totalAssets }, { label: "Liabilities", value: -liabilitiesExclJeonse }] });
      case "debt":
        return /* @__PURE__ */ React.createElement(CompactScoreCard, { title: "Liabilities (excl. Jeonse)", value: liabilitiesExclJeonse, yoy: calcYoY(liabilitiesExclJeonse, prevLiabilities), icon: Icons.CreditCard, colorClass: "text-rose-400" });
      case "invest":
        return /* @__PURE__ */ React.createElement(CompactScoreCard, { title: "Stock Assets", value: totalStockAssets, yoy: calcYoY(totalStockAssets, prevTotalStockAssets), icon: Icons.CandlestickChart, colorClass: "text-violet-400" });
      case "emergency":
        return /* @__PURE__ */ React.createElement(GlassCard, { className: "p-3 group hover:-translate-y-1 transition-transform border-l-4 border-emerald-400 h-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col justify-between h-full min-h-[90px] relative" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "p-1 rounded bg-cyan-500/20 text-cyan-400" }, /* @__PURE__ */ React.createElement(Icons.ShieldCheck, { className: "w-3.5 h-3.5" })), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider" }, "Emergency Coverage")), /* @__PURE__ */ React.createElement("div", { className: "group/tip relative flex items-center" }, /* @__PURE__ */ React.createElement(Icons.Info, { className: "w-3 h-3 text-slate-500 hover:text-cyan-400 cursor-help" }), /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-sm text-white text-[10px] rounded-lg p-3 opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl border border-white/10 leading-relaxed" }, "Liquid assets (savings) divided by monthly expenses. Recommended to be 6+ months."))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-black text-cyan-300 font-grotesk" }, emergencyIndex, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold ml-1 text-cyan-500" }, " months")), /* @__PURE__ */ React.createElement("p", { className: "text-[9px] text-slate-500 mt-1" }, "Recommended: 6+ months"))));
      case "annual":
        return /* @__PURE__ */ React.createElement(CompactScoreCard, { title: "Annual Investment Profit", value: annualData.profit + annualData.dividend, icon: Icons.CandlestickChart, colorClass: "text-fuchsia-400" });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 pb-12 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-extrabold text-white tracking-tighter font-grotesk" }, "Dashboard"), /* @__PURE__ */ React.createElement("div", { className: "h-6 w-px bg-white/10 mx-2" }), /* @__PURE__ */ React.createElement("p", { className: "text-slate-400 text-sm font-bold flex items-center gap-2" }, todayStr, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-[9px] text-cyan-400 font-mono tracking-wider font-semibold" }, "TODAY")))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2" }, /* @__PURE__ */ React.createElement(
    CombinedAssetTelemetry,
    {
      totalAssets,
      liquidAssets,
      liabilities: liabilitiesExclJeonse,
      prevTotalAssets,
      calcYoY
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4" }, renderScoreCard("net"), renderScoreCard("annual"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2" }, /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Asset Flow Telemetry", icon: Icons.Activity, className: "h-[500px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(ComposedChart, { data: fullGrowthData }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "colorTotal", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#06b6d4", stopOpacity: 0.3 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#06b6d4", stopOpacity: 0 })), /* @__PURE__ */ React.createElement("linearGradient", { id: "colorNet", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#8b5cf6", stopOpacity: 0.3 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#8b5cf6", stopOpacity: 0 }))), /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255, 255, 255, 0.05)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", fontSize: 10, stroke: "#64748b", tickMargin: 10, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { yAxisId: "left", fontSize: 10, width: 45, stroke: "#64748b", tickFormatter: (val) => val >= 1e9 ? `${(val / 1e9).toFixed(1)}B` : val >= 1e6 ? `${(val / 1e6).toFixed(0)}M` : val, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { yAxisId: "right", orientation: "right", fontSize: 10, width: 30, stroke: "#64748b", unit: "%", axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(RechartsTooltip, { formatter: (val, name) => name === "Debt Ratio" ? `${val}%` : formatCurrency(val), contentStyle: { background: "rgba(10, 11, 22, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", color: "#e2e8f0" } }), /* @__PURE__ */ React.createElement(Area, { yAxisId: "left", type: "monotone", dataKey: "assets", name: "Total Assets", stroke: "#06b6d4", strokeWidth: 2, fill: "url(#colorTotal)" }), /* @__PURE__ */ React.createElement(Line, { yAxisId: "left", type: "monotone", dataKey: "netWorth", name: "Net Worth", stroke: "#8b5cf6", strokeWidth: 2.5, dot: false }), /* @__PURE__ */ React.createElement(Line, { yAxisId: "right", type: "monotone", dataKey: "debtRatio", name: "Debt Ratio", stroke: "#ec4899", strokeWidth: 1.5, strokeDasharray: "4 4", dot: false })))))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-1" }, /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Asset Allocation Strategy", icon: Icons.Target, className: "h-[500px]", headerExtra: /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 font-medium font-grotesk" }, viewDate, " CRITERION") }, /* @__PURE__ */ React.createElement(MonthlyAssetRatioCard, { date: viewDate, data: safeData, isWrapped: true })))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Asset Category Growth", icon: Icons.Activity, className: "h-64" }, /* @__PURE__ */ React.createElement("div", { className: "h-full" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(LineChart, { data: assetGrowthData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255, 255, 255, 0.05)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", fontSize: 10, stroke: "#64748b", tickMargin: 5, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 10, width: 40, stroke: "#64748b", tickFormatter: (val) => val >= 1e9 ? `${(val / 1e9).toFixed(1)}B` : val >= 1e6 ? `${(val / 1e6).toFixed(0)}M` : val, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(RechartsTooltip, { formatter: (val) => formatCurrency(val), contentStyle: { background: "rgba(10, 11, 22, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "6px 10px", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", color: "#e2e8f0" }, itemStyle: { fontSize: "11px", padding: 0 }, labelStyle: { fontSize: "11px", marginBottom: "2px" } }), /* @__PURE__ */ React.createElement(Legend, { iconType: "circle", wrapperStyle: { fontSize: "10px", paddingTop: "10px" } }), Object.keys(ASSET_CATEGORIES).map((key) => /* @__PURE__ */ React.createElement(Line, { key, type: "monotone", dataKey: ASSET_CATEGORIES[key].label, stroke: ASSET_CATEGORIES[key].color, strokeWidth: 2, dot: { r: 0 }, activeDot: { r: 4 } })))))), /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Cash Flow Breakdown", icon: Icons.Banknote, className: "h-64" }, /* @__PURE__ */ React.createElement("div", { className: "h-full" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(BarChart, { data: cashFlowData, barGap: 4 }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255, 255, 255, 0.05)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", fontSize: 10, stroke: "#64748b", axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 10, width: 40, stroke: "#64748b", tickFormatter: (val) => val >= 1e6 ? `${(val / 1e6).toFixed(1)}M` : val >= 1e3 ? `${(val / 1e3).toFixed(0)}k` : val, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(RechartsTooltip, { cursor: { fill: "rgba(255,255,255,0.02)" }, formatter: (val) => formatCurrency(val), contentStyle: { background: "rgba(10, 11, 22, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "6px 10px", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", color: "#e2e8f0" }, itemStyle: { fontSize: "11px", padding: 0 }, labelStyle: { fontSize: "11px", marginBottom: "2px" } }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "10px" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "income", name: "Income", fill: "#06b6d4", radius: [4, 4, 0, 0], barSize: 12 }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "expenses", name: "Expenses", stackId: "out", fill: "#ec4899", barSize: 12 }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "savings", name: "Savings", stackId: "out", fill: "#10b981", barSize: 12 }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "investment", name: "Investment", stackId: "out", fill: "#8b5cf6", radius: [4, 4, 0, 0], barSize: 12 }))))), /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Asset Portfolio", icon: Icons.PieChart, className: "h-64", headerExtra: /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 font-bold font-grotesk" }, viewDate, " STATUS") }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex items-center gap-2 min-h-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-2/5 h-full relative" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(Pie, { data: portfolioData, cx: "50%", cy: "50%", innerRadius: "60%", outerRadius: "90%", paddingAngle: 2, dataKey: "value", cornerRadius: 3, onMouseEnter: (_, index) => setActiveIndex(index), onMouseLeave: () => setActiveIndex(null), activeIndex: activeItem === null ? -1 : activeItem, activeShape: renderActiveShape }, portfolioData.map((entry, index) => /* @__PURE__ */ React.createElement(Cell, { key: `cell-${index}`, fill: entry.color, stroke: "none" }))))), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-0" }, /* @__PURE__ */ React.createElement("span", { className: "text-[9px] font-bold text-slate-500 font-grotesk tracking-widest" }, "TOTAL"))), /* @__PURE__ */ React.createElement("div", { className: "w-3/5 h-full flex flex-col justify-center pr-1 overflow-y-auto custom-scrollbar" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, portfolioData.map((entry, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: `flex justify-between items-center text-[10px] p-1 rounded transition-colors ${activeItem === index ? "bg-white/5" : ""}`, onMouseEnter: () => setActiveIndex(index), onMouseLeave: () => setActiveIndex(null) }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { backgroundColor: entry.color } }), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-300 truncate", title: entry.name }, entry.name)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 flex-shrink-0" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-200" }, formatCurrency(entry.value)), /* @__PURE__ */ React.createElement("span", { className: "text-slate-500 font-mono w-8 text-right" }, (entry.value / totalAssets * 100).toFixed(0), "%"))))))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Annual Accumulation Ratio", icon: Icons.PieChart, className: "h-64" }, /* @__PURE__ */ React.createElement(YearlyRatioCard, { year: viewYear, data: safeData, isWrapped: true })), /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Emergency Index & Monthly Status", icon: Icons.ShieldCheck, className: "h-64" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-3 h-full" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3" }, /* @__PURE__ */ React.createElement("p", { className: "text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-grotesk mb-1" }, "Emergency Index"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-black text-emerald-300 font-grotesk" }, emergencyIndex, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold ml-1 text-emerald-500" }, " months")), /* @__PURE__ */ React.createElement("p", { className: "text-[9px] text-emerald-500 mt-0.5 font-medium" }, "Recommended: 6+ months")), /* @__PURE__ */ React.createElement("div", { className: "bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3" }, /* @__PURE__ */ React.createElement("p", { className: "text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-grotesk mb-1" }, "Monthly Savings Rate"), /* @__PURE__ */ React.createElement("p", { className: `text-2xl font-black font-grotesk ${totalIncome > 0 ? (totalIncome - totalExpense) / totalIncome * 100 >= 20 ? "text-emerald-300" : "text-amber-300" : "text-slate-500"}` }, totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : "\u2014", /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold ml-0.5" }, totalIncome > 0 ? "%" : "")), /* @__PURE__ */ React.createElement("p", { className: "text-[9px] text-indigo-400 mt-0.5 font-medium" }, "Recommended: 20%+"))), /* @__PURE__ */ React.createElement("div", { className: "bg-white/5 border border-white/10 rounded-xl p-3 flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "text-[9px] font-bold text-slate-400 uppercase tracking-widest font-grotesk mb-2" }, viewYear, " Cumulative Stock Profits"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[9px] text-slate-500" }, "Realized Profit"), /* @__PURE__ */ React.createElement("p", { className: `text-sm font-black font-grotesk ${annualData.profit >= 0 ? "text-rose-400" : "text-blue-400"}` }, formatCurrency(annualData.profit))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[9px] text-slate-500" }, "Dividends"), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-black font-grotesk text-emerald-400" }, formatCurrency(annualData.dividend))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[9px] text-slate-500" }, "Total"), /* @__PURE__ */ React.createElement("p", { className: `text-sm font-black font-grotesk ${annualData.profit + annualData.dividend >= 0 ? "text-cyan-400" : "text-blue-400"}` }, formatCurrency(annualData.profit + annualData.dividend))))))), /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Financial Health Indicators", icon: Icons.Activity, className: "h-64" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2.5 h-full justify-center" }, (() => {
    const dr = netWorth > 0 ? liabilitiesExclJeonse / netWorth * 100 : liabilitiesExclJeonse > 0 ? 999 : 0;
    const drStatus = netWorth <= 0 && liabilitiesExclJeonse > 0 || dr > 40 ? { label: "DANGER", c: "text-rose-400", bg: "bg-rose-500", range: 100 } : dr > 20 ? { label: "WARNING", c: "text-amber-400", bg: "bg-amber-500", range: Math.min(dr, 100) } : { label: "HEALTHY", c: "text-emerald-400", bg: "bg-emerald-500", range: Math.min(dr, 100) };
    const sr = totalIncome > 0 ? (totalIncome - totalExpense) / totalIncome * 100 : 0;
    const srStatus = sr < 0 ? { label: "DEFICIT", c: "text-rose-400", bg: "bg-rose-500", range: 0 } : sr < 20 ? { label: "LOW", c: "text-amber-400", bg: "bg-amber-500", range: Math.min(sr, 100) } : { label: "HEALTHY", c: "text-emerald-400", bg: "bg-emerald-500", range: Math.min(sr, 100) };
    const liqRatio = totalAssets > 0 ? liquidAssets / totalAssets * 100 : 0;
    const liqStatus = liqRatio < 10 ? { label: "LOW", c: "text-amber-400", bg: "bg-amber-500", range: liqRatio } : { label: "HEALTHY", c: "text-emerald-400", bg: "bg-emerald-500", range: liqRatio };
    const items = [
      { label: "Debt Ratio", value: netWorth <= 0 && liabilitiesExclJeonse > 0 ? "Impairment" : dr.toFixed(1) + "%", status: drStatus, desc: "Debt to Net Worth (Recommended <20%)" },
      { label: "Savings Rate", value: sr.toFixed(1) + "%", status: srStatus, desc: "Surplus to Income (Recommended >20%)" },
      { label: "Liquidity Ratio", value: liqRatio.toFixed(1) + "%", status: liqStatus, desc: "Cash weight of assets (Recommended >10%)" }
    ];
    return items.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-400" }, item.label), /* @__PURE__ */ React.createElement("span", { className: `text-[8px] font-bold px-1.5 py-0.5 rounded-full ${item.status.c} bg-white/5 border border-white/10` }, item.status.label)), /* @__PURE__ */ React.createElement("span", { className: `text-[11px] font-extrabold ${item.status.c} font-grotesk` }, item.value)), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-white/5 rounded-full h-1.5 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: `h-full rounded-full transition-all duration-700 ${item.status.bg}`, style: { width: `${Math.min(item.status.range, 100)}%` } })), /* @__PURE__ */ React.createElement("p", { className: "text-[8px] text-slate-500" }, item.desc)));
  })()))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" }, /* @__PURE__ */ React.createElement(
    CollapsibleCard,
    {
      title: "Savings Rate & Investment Share Trend",
      icon: Icons.TrendingUp,
      className: "h-full",
      headerExtra: /* @__PURE__ */ React.createElement("div", { className: "group/tip relative flex items-center" }, /* @__PURE__ */ React.createElement(Icons.Info, { className: "w-3.5 h-3.5 text-slate-500 hover:text-cyan-400 cursor-help" }), /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-full mt-2 w-56 bg-slate-955/95 backdrop-blur-sm text-white text-[10px] rounded-lg p-3 opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity z-50 shadow-2xl border border-white/10 leading-relaxed" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-cyan-400 border-b border-white/10 pb-1 mb-1.5 font-grotesk" }, "CALCULATION INDEX"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400" }, "Savings Rate:"), " (Income - Expenses) / Income * 100"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400" }, "Investment Share:"), " Investment / Income * 100"), /* @__PURE__ */ React.createElement("p", { className: "text-[9px] text-slate-500" }, "* Based on Income, Expenses, Investment categories"))))
    },
    /* @__PURE__ */ React.createElement("div", { className: "h-64" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(ComposedChart, { data: cashFlowData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255, 255, 255, 0.05)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", fontSize: 10, stroke: "#64748b", axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 10, width: 30, stroke: "#64748b", unit: "%", axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(RechartsTooltip, { formatter: (val, name) => [`${val}%`, name], contentStyle: { background: "rgba(10, 11, 22, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", color: "#e2e8f0" } }), /* @__PURE__ */ React.createElement(Legend, { iconType: "circle", wrapperStyle: { fontSize: "10px" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "savingsRate", name: "Savings Rate", fill: "#10b981", radius: [4, 4, 0, 0], barSize: 16 }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "investmentShare", name: "Investment Share", stroke: "#8b5cf6", strokeWidth: 2, dot: { r: 3 }, isAnimationActive: false, label: false }))))
  ), /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Console Memo", icon: Icons.Edit2, className: "h-full" }, /* @__PURE__ */ React.createElement(MemoCard, { memo: safeData.meta?.dashboardMemo, onUpdate: (val) => {
    const n = JSON.parse(JSON.stringify(safeData));
    if (!n.meta) n.meta = {};
    n.meta.dashboardMemo = val;
    onUpdate(n);
  }, isWrapped: true }))));
};
const CashFlowSankeyChart = ({ data, isWrapped }) => {
  const [viewMode, setViewMode] = useState("year");
  const months = useMemo(() => Object.keys(data).filter(isMonthKey).sort(), [data]);
  const years = useMemo(() => [...new Set(months.map((m) => m.substring(0, 4)))], [months]);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1] || (/* @__PURE__ */ new Date()).getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(months[months.length - 1] || "");
  useEffect(() => {
    if (!years.includes(selectedYear) && years.length > 0) setSelectedYear(years[years.length - 1]);
    if (!months.includes(selectedMonth) && months.length > 0) setSelectedMonth(months[months.length - 1]);
  }, [years, months, selectedYear, selectedMonth]);
  const sankeyData = useMemo(() => {
    let targetMonths = viewMode === "year" ? months.filter((m) => m.startsWith(selectedYear)) : [selectedMonth].filter(Boolean);
    let totalIncome = 0, totalExpense = 0, totalSaving = 0, totalInvest = 0;
    const incomeBySrc = {}, expenseByDst = {}, savingByDst = {}, investByDst = {};
    targetMonths.forEach((m) => {
      (data[m]?.budget || []).forEach((b) => {
        if (isItemHidden(b, "budget", data.meta)) return;
        const val = evaluateFormula(b.amount) || 0;
        if (val <= 0) return;
        const cat1 = normalizeCategory(b.category, "budget");
        const cat2 = b.category2 || "Other";
        if (cat1 === "INCOME") {
          totalIncome += val;
          incomeBySrc[cat2] = (incomeBySrc[cat2] || 0) + val;
        } else if (cat1 === "EXPENSE") {
          totalExpense += val;
          expenseByDst[cat2] = (expenseByDst[cat2] || 0) + val;
        } else if (cat1 === "SAVING") {
          totalSaving += val;
          savingByDst[cat2] = (savingByDst[cat2] || 0) + val;
        } else if (cat1 === "INVEST") {
          totalInvest += val;
          investByDst[cat2] = (investByDst[cat2] || 0) + val;
        }
      });
    });
    const totalOutflow = totalExpense + totalSaving + totalInvest;
    const balance = totalIncome - totalOutflow;
    const nodeNames = [], links = [];
    const addNode = (name) => {
      let idx = nodeNames.indexOf(name);
      if (idx === -1) {
        nodeNames.push(name);
        idx = nodeNames.length - 1;
      }
      return idx;
    };
    const addLink = (srcName, targetName, value) => {
      if (value > 0) links.push({ source: addNode(srcName), target: addNode(targetName), value });
    };
    const hubNode = "Total Income";
    if (totalExpense > 0) addLink(hubNode, "Total Expenses", totalExpense);
    if (totalSaving > 0) addLink(hubNode, "Total Savings", totalSaving);
    if (totalInvest > 0) addLink(hubNode, "Total Investment", totalInvest);
    if (balance > 0) addLink(hubNode, "Unclassified", balance);
    const THRESHOLD = 1e6;
    Object.entries(expenseByDst).forEach(([dst, val]) => {
      if (val >= THRESHOLD) addLink("Total Expenses", dst, val);
    });
    Object.entries(savingByDst).forEach(([dst, val]) => {
      if (val >= THRESHOLD) addLink("Total Savings", dst, val);
    });
    Object.entries(investByDst).forEach(([dst, val]) => {
      if (val >= THRESHOLD) addLink("Total Investment", dst, val);
    });
    return { nodes: nodeNames.map((name) => ({ name })), links };
  }, [data, viewMode, selectedYear, selectedMonth, months]);
  const CustomNode = ({ x, y, width, height, index, payload }) => {
    const name = payload.name;
    const isHub = name === "Total Income";
    const isFirstLvl = isHub;
    const isMidLvl = name === "Total Expenses" || name === "Total Savings" || name === "Total Investment" || name === "Unclassified";
    let fill = "#94a3b8";
    if (isHub) fill = "#00f2fe";
    else if (name.includes("Expenses")) fill = "#f43f5e";
    else if (name.includes("Savings")) fill = "#10b981";
    else if (name.includes("Investment")) fill = "#8b5cf6";
    return /* @__PURE__ */ React.createElement(Layer, { key: `CustomNode${index}` }, /* @__PURE__ */ React.createElement(Rectangle, { x, y, width, height, fill, rx: 2 }), /* @__PURE__ */ React.createElement(
      "text",
      {
        textAnchor: isFirstLvl ? "end" : "start",
        x: isFirstLvl ? x - 10 : x + width + 10,
        y: y + height / 2 + 4,
        fontSize: "10",
        fill: "#94a3b8",
        fontWeight: isMidLvl || isHub ? "800" : "600"
      },
      name
    ));
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0];
      const data2 = p.payload;
      const isNode = data2.source === void 0;
      const value = p.value || data2.value || 0;
      const name = isNode ? data2.name : `${data2.source?.name || data2.source} \u2192 ${data2.target?.name || data2.target}`;
      return /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f1026]/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-cyan-500/30 text-[11px] z-[1000] min-w-[140px]" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-cyan-400 mb-1 uppercase tracking-wider" }, isNode ? "Category" : "Cash Flow Path"), /* @__PURE__ */ React.createElement("p", { className: "font-black text-white mb-2" }, name), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-cyan-400 font-black text-sm tracking-tighter" }, formatCurrency(value))));
    }
    return null;
  };
  const handleSlicerChange = (direction) => {
    if (viewMode === "year") {
      const idx = years.indexOf(selectedYear);
      if (idx !== -1) {
        const newIdx = idx + direction;
        if (newIdx >= 0 && newIdx < years.length) setSelectedYear(years[newIdx]);
      }
    } else {
      const idx = months.indexOf(selectedMonth);
      if (idx !== -1) {
        const newIdx = idx + direction;
        if (newIdx >= 0 && newIdx < months.length) setSelectedMonth(months[newIdx]);
      }
    }
  };
  const controls = /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 w-full mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex p-1 bg-black/40 rounded-xl shrink-0 border border-white/10" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setViewMode("year"), className: `px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "year" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-grotesk shadow-sm" : "text-slate-400 hover:text-slate-200"}` }, "Yearly"), /* @__PURE__ */ React.createElement("button", { onClick: () => setViewMode("month"), className: `px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "month" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-grotesk shadow-sm" : "text-slate-400 hover:text-slate-200"}` }, "Monthly")), /* @__PURE__ */ React.createElement("div", { className: "group/info relative flex items-center" }, /* @__PURE__ */ React.createElement(Icons.Info, { className: "w-4 h-4 text-slate-400 hover:text-cyan-400 cursor-help transition-colors" }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-0 top-full mt-2 w-48 bg-slate-955 text-slate-300 text-[10px] rounded-lg p-3 opacity-0 group-hover/info:opacity-100 pointer-events-none transition-all z-50 shadow-2xl border border-white/10 leading-relaxed" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-cyan-400 mb-1" }, "Visualization Filter"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-300 font-grotesk" }, "Minor flows under ", /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold" }, "\u20A9 1.0M"), " based on Subcategory are hidden to maintain chart readability.")))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 bg-black/30 px-4 py-1.5 rounded-full border border-white/10 transition-all hover:border-cyan-500/30" }, /* @__PURE__ */ React.createElement("button", { onClick: () => handleSlicerChange(-1), className: "p-1.5 hover:bg-white/5 rounded-full text-slate-400 hover:text-cyan-400 transition-all" }, /* @__PURE__ */ React.createElement(Icons.ChevronLeft, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-black text-slate-200 min-w-[80px] text-center tracking-tight font-grotesk" }, viewMode === "year" ? `${selectedYear} Cumulative` : selectedMonth), /* @__PURE__ */ React.createElement("button", { onClick: () => handleSlicerChange(1), className: "p-1.5 hover:bg-white/5 rounded-full text-slate-400 hover:text-cyan-400 transition-all" }, /* @__PURE__ */ React.createElement(Icons.ChevronRight, { className: "w-4 h-4" }))));
  const chartContent = /* @__PURE__ */ React.createElement("div", { className: "w-full h-[360px] relative" }, sankeyData.nodes.length > 0 && sankeyData.links.length > 0 ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(
    Sankey,
    {
      data: sankeyData,
      nodeWidth: 10,
      nodePadding: 20,
      margin: { left: 100, right: 100, top: 10, bottom: 10 },
      link: { stroke: "#00f2fe", strokeOpacity: 0.15 },
      node: /* @__PURE__ */ React.createElement(CustomNode, null),
      iterations: 64,
      style: { cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement(
      RechartsTooltip,
      {
        content: /* @__PURE__ */ React.createElement(CustomTooltip, null),
        wrapperStyle: { zIndex: 1e3 },
        isAnimationActive: false
      }
    )
  )) : /* @__PURE__ */ React.createElement("div", { className: "w-full h-full flex flex-col items-center justify-center text-slate-500 font-bold text-sm bg-black/20 rounded-2xl border border-dashed border-cyan-500/20" }, /* @__PURE__ */ React.createElement(Icons.PieChart, { className: "w-8 h-8 mb-2 opacity-40 text-cyan-400" }), "No cash flow data to display."));
  if (isWrapped) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col w-full h-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex w-full overflow-hidden" }, controls), chartContent);
  }
  return /* @__PURE__ */ React.createElement(GlassCard, { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" }, /* @__PURE__ */ React.createElement(Icons.TrendingUp, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-white font-grotesk" }, "Cash Flow Pipeline"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 font-medium tracking-tight" }, "Income & Expense Path"))), controls), chartContent);
};
const GenericSpreadsheet = ({ data = {}, type, onUpdate, categories, hasCategory }) => {
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const safeData = data || {};
  const months = Object.keys(safeData).filter(isMonthKey).sort();
  const listKey = type === "stockProfit" ? "stockProfit" : type;
  const [newItemName, setNewItemName] = useState("");
  const [targetCategory, setTargetCategory] = useState(hasCategory ? Object.keys(categories)[0] : "");
  const [targetCategory2, setTargetCategory2] = useState("");
  const [editingItemOption, setEditingItemOption] = useState(null);
  const [colWidths, setColWidths] = useState(() => {
    const saved = localStorage.getItem(`colWidths_v2_${type}`);
    return saved ? JSON.parse(saved) : { c1: 77, c2: 66, c3: 110 };
  });
  useEffect(() => {
    localStorage.setItem(`colWidths_v2_${type}`, JSON.stringify(colWidths));
  }, [colWidths, type]);
  const [resizing, setResizing] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    if (!resizing) return;
    const handleMouseMove = (e) => {
      const diff = e.clientX - resizing.startX;
      let newWidth = Math.max(40, resizing.startW + diff);
      setColWidths((prev) => ({ ...prev, [resizing.col]: newWidth }));
    };
    const handleMouseUp = () => setResizing(null);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const [hiddenItems, setHiddenItems] = useState(() => {
    const savedHidden = safeData.meta?.hiddenRows?.[type];
    return new Set(savedHidden || []);
  });
  const [showHidden, setShowHidden] = useState(false);
  const [hiddenMonths, setHiddenMonths] = useState(() => {
    const savedHidden = safeData.meta?.hiddenMonths?.[type];
    return new Set(savedHidden || []);
  });
  const [showHiddenMonths, setShowHiddenMonths] = useState(false);
  const [orderedItems, setOrderedItems] = useState({});
  const visibleMonths = useMemo(() => months.filter((m) => showHiddenMonths || !hiddenMonths.has(m)), [months, showHiddenMonths, hiddenMonths]);
  useEffect(() => {
    const savedHidden = safeData.meta?.hiddenRows?.[type];
    if (savedHidden) setHiddenItems(new Set(savedHidden));
  }, [safeData.meta?.hiddenRows, type]);
  useEffect(() => {
    const savedHiddenMonths = safeData.meta?.hiddenMonths?.[type];
    if (savedHiddenMonths) setHiddenMonths(new Set(savedHiddenMonths));
  }, [safeData.meta?.hiddenMonths, type]);
  const toggleHide = (itemKey) => {
    const next = new Set(hiddenItems);
    if (next.has(itemKey)) next.delete(itemKey);
    else next.add(itemKey);
    setHiddenItems(next);
    const newData = JSON.parse(JSON.stringify(safeData));
    if (!newData.meta) newData.meta = {};
    if (!newData.meta.hiddenRows) newData.meta.hiddenRows = {};
    newData.meta.hiddenRows[type] = Array.from(next);
    onUpdate(newData);
  };
  const toggleHideMonth = (month) => {
    const next = new Set(hiddenMonths);
    if (next.has(month)) next.delete(month);
    else next.add(month);
    setHiddenMonths(next);
    const newData = JSON.parse(JSON.stringify(safeData));
    if (!newData.meta) newData.meta = {};
    if (!newData.meta.hiddenMonths) newData.meta.hiddenMonths = {};
    newData.meta.hiddenMonths[type] = Array.from(next);
    onUpdate(newData);
  };
  useEffect(() => {
    const currentUnique = /* @__PURE__ */ new Set();
    const tempGroups = hasCategory ? Object.fromEntries(Object.keys(categories).map((k) => [k, []])) : { ALL: [] };
    Object.values(safeData).forEach((m) => {
      (m[listKey] || []).forEach((i) => {
        const groupCat = hasCategory && categories[i.category] ? i.category : hasCategory ? normalizeCategory(i.category, type) : "ALL";
        const validCat2 = i.category2 || "";
        const itemKey = hasCategory ? `${i.category || "ALL"}|${validCat2}|${i.name}` : i.name;
        if (!currentUnique.has(itemKey)) {
          currentUnique.add(itemKey);
          if (tempGroups[groupCat]) tempGroups[groupCat].push({ name: i.name, category: i.category, category2: validCat2, itemKey });
        }
      });
    });
    setOrderedItems((prev) => {
      const next = { ...prev };
      let changed = false;
      const keys = hasCategory ? Object.keys(categories) : ["ALL"];
      keys.forEach((cat) => {
        const itemsInGroup = tempGroups[cat] || [];
        itemsInGroup.sort((a, b) => {
          if (hasCategory) {
            const c2A = a.category2 || "";
            const c2B = b.category2 || "";
            if (c2A !== c2B) return c2A.localeCompare(c2B);
          }
          return a.name.localeCompare(b.name);
        });
        if (JSON.stringify(itemsInGroup) !== JSON.stringify(next[cat])) {
          next[cat] = itemsInGroup;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [safeData, listKey, hasCategory, categories]);
  const handleReorder = (targetCat, fromName, toName, sourceCat) => {
    if (fromName === toName && targetCat === sourceCat) return;
    if (hasCategory && targetCat !== sourceCat) {
      if (confirm(`Move '${fromName}' from '${categories[sourceCat]?.label}' to '${categories[targetCat]?.label}'?`)) {
        const newData = JSON.parse(JSON.stringify(safeData));
        Object.keys(newData).forEach((month) => {
          if (isMonthKey(month) && newData[month][listKey]) {
            const item = newData[month][listKey].find((i) => {
              const iCat = hasCategory && categories[i.category] ? i.category : hasCategory ? Object.keys(categories)[0] : "ALL";
              return i.name === fromName && iCat === sourceCat;
            });
            if (item) item.category = targetCat;
          }
        });
        onUpdate(newData);
      }
    }
  };
  const handleDeleteRow = (itemKey, label) => {
    if (!confirm(`Are you sure you want to delete '${label}'?`)) return;
    const newData = JSON.parse(JSON.stringify(safeData));
    Object.keys(newData).forEach((m) => {
      if (isMonthKey(m) && newData[m][listKey])
        newData[m][listKey] = newData[m][listKey].filter((i) => {
          const iKey = `${i.category || "ALL"}|${i.category2 || ""}|${i.name}`;
          return iKey !== itemKey;
        });
    });
    onUpdate(newData);
  };
  const handleCellChange = (month, itemName, field, val, itemCategory, itemCategory2) => {
    const newData = JSON.parse(JSON.stringify(safeData));
    if (!newData[month][listKey]) newData[month][listKey] = [];
    const list = newData[month][listKey];
    const searchCat1 = itemCategory || (hasCategory ? targetCategory || Object.keys(categories)[0] : "ALL");
    const searchCat2 = itemCategory2 !== void 0 ? itemCategory2 : targetCategory2;
    const idx = list.findIndex((i) => {
      if (!hasCategory) return i.name === itemName;
      return i.name === itemName && (i.category || "ALL") === searchCat1 && (i.category2 || "") === (searchCat2 || "");
    });
    if (idx >= 0) {
      list[idx][field] = val;
    } else {
      const newItem = { id: Date.now(), name: itemName };
      if (hasCategory) {
        newItem.category = searchCat1;
        newItem.category2 = searchCat2;
      } else {
        const existingEntry = Object.keys(safeData).filter(isMonthKey).flatMap((m) => safeData[m]?.[listKey] || []).find((i) => i.name === itemName);
        if (existingEntry?.category) newItem.category = existingEntry.category;
      }
      if (type === "assets") newItem.value = 0;
      else if (type === "stockProfit") {
        newItem.profit = 0;
        newItem.dividend = 0;
      } else newItem.amount = 0;
      newItem[field] = val;
      list.push(newItem);
    }
    onUpdate(newData);
  };
  const handleAddRow = () => {
    if (!newItemName) return;
    const lastMonth = months[months.length - 1];
    if (lastMonth) {
      let defaultField = type === "assets" ? "value" : type === "stockProfit" ? targetCategory === "DIVIDEND" ? "dividend" : "profit" : "amount";
      handleCellChange(lastMonth, newItemName, defaultField, 0);
    }
    setNewItemName("");
  };
  const handleSaveRowEdit = () => {
    if (!editingItemOption || !editingItemOption.newName) {
      setEditingItemOption(null);
      return;
    }
    const { oldName, newName, cat1, cat2, oldCat1, oldCat2 } = editingItemOption;
    const newData = JSON.parse(JSON.stringify(safeData));
    let conflict = false;
    if (oldName !== newName || oldCat1 !== cat1 || oldCat2 !== cat2) {
      Object.values(newData).forEach((m) => {
        if (m[listKey] && m[listKey].some((i) => {
          const iCat = hasCategory && categories[i.category] ? i.category : hasCategory ? Object.keys(categories)[0] : "ALL";
          const iCat2 = i.category2 || "";
          return i.name === newName && iCat === cat1 && iCat2 === cat2;
        })) conflict = true;
      });
    }
    if (conflict) {
      alert("This item already exists.");
      return;
    }
    Object.keys(newData).forEach((m) => {
      if (isMonthKey(m) && newData[m][listKey]) {
        const item = newData[m][listKey].find((i) => {
          const iCat = hasCategory && categories[i.category] ? i.category : hasCategory ? Object.keys(categories)[0] : "ALL";
          const iCat2 = i.category2 || "";
          return i.name === oldName && iCat === oldCat1 && iCat2 === oldCat2;
        });
        if (item) {
          item.name = newName;
          if (hasCategory) {
            item.category = cat1;
            item.category2 = cat2;
          }
        }
      }
    });
    onUpdate(newData);
    setEditingItemOption(null);
  };
  const handleAddMonth = () => {
    const last = months[months.length - 1];
    let newKey;
    if (!last) {
      const now = /* @__PURE__ */ new Date();
      newKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    } else {
      const [y, m] = last.split("-").map(Number);
      let ny = y, nm = m + 1;
      if (nm > 12) {
        ny++;
        nm = 1;
      }
      newKey = `${ny}-${String(nm).padStart(2, "0")}`;
    }
    const newData = JSON.parse(JSON.stringify(safeData));
    if (!newData[newKey]) newData[newKey] = { assets: [], loans: [], budget: [], stockProfit: [] };
    onUpdate(newData);
  };
  const handleDeleteMonth = (month) => {
    if (!confirm(`Delete data for ${month}? This action cannot be undone.`)) return;
    const newData = JSON.parse(JSON.stringify(safeData));
    delete newData[month];
    onUpdate(newData);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col h-[calc(100vh-180px)] overflow-hidden bg-black/30 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md" }, /* @__PURE__ */ React.createElement("div", { className: "px-3 py-2 bg-[var(--ss-hdr-bg)] border-b border-[var(--ss-hdr-border)] flex flex-wrap gap-2 justify-between items-center text-xs z-40 relative" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 items-center" }, hasCategory && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("select", { className: "px-2.5 py-1.5 border border-white/10 bg-slate-900/60 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-500/20 text-slate-300 text-xs rounded-xl", value: targetCategory, onChange: (e) => setTargetCategory(e.target.value) }, Object.entries(categories).map(([k, v]) => /* @__PURE__ */ React.createElement("option", { key: k, value: k }, v.label))), /* @__PURE__ */ React.createElement("input", { type: "text", placeholder: "Subcategory", className: "px-2.5 py-1.5 border border-white/10 bg-slate-900/60 w-24 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-500/20 text-xs rounded-xl text-white", value: targetCategory2, onChange: (e) => setTargetCategory2(e.target.value) })), /* @__PURE__ */ React.createElement("input", { type: "text", placeholder: "Item Name", className: "px-2.5 py-1.5 border border-white/10 bg-slate-900/60 w-32 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-500/20 text-xs rounded-xl text-white", value: newItemName, onChange: (e) => setNewItemName(e.target.value) }), /* @__PURE__ */ React.createElement("button", { onClick: handleAddRow, className: "flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold transition-all rounded-xl shadow-sm" }, /* @__PURE__ */ React.createElement(Icons.Plus, { className: "w-3.5 h-3.5" }), " Add")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-1.5 text-slate-400 cursor-pointer select-none px-2.5 py-1.5 hover:bg-white/5 hover:text-white transition-colors rounded-xl" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: showHidden, onChange: (e) => setShowHidden(e.target.checked), className: "rounded bg-black/40 border-white/10 text-cyan-400 focus:ring-0" }), " Hidden Rows"), /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-1.5 text-slate-400 cursor-pointer select-none px-2.5 py-1.5 hover:bg-white/5 hover:text-white transition-colors rounded-xl" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: showHiddenMonths, onChange: (e) => setShowHiddenMonths(e.target.checked), className: "rounded bg-black/40 border-white/10 text-cyan-400 focus:ring-0" }), " Hidden Cols"), /* @__PURE__ */ React.createElement("button", { onClick: handleAddMonth, className: "flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-all rounded-xl shadow-sm" }, /* @__PURE__ */ React.createElement(Icons.CalendarPlus, { className: "w-3.5 h-3.5" }), " Add Month"), /* @__PURE__ */ React.createElement("input", { type: "file", accept: ".csv", ref: fileInputRef, className: "hidden", onChange: (e) => processFileUpload(e.target.files[0], safeData, type, onUpdate, setIsUploading) }), /* @__PURE__ */ React.createElement("button", { onClick: () => fileInputRef.current.click(), disabled: isUploading, className: "flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all disabled:opacity-50 rounded-xl" }, isUploading ? /* @__PURE__ */ React.createElement(Icons.Loader2, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ React.createElement(Icons.Upload, { className: "w-3.5 h-3.5" }), " Upload CSV"), /* @__PURE__ */ React.createElement("button", { onClick: () => downloadCSV(safeData, type), className: "flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all rounded-xl" }, /* @__PURE__ */ React.createElement(Icons.Download, { className: "w-3.5 h-3.5" }), " Download CSV"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-auto custom-scrollbar bg-transparent relative" }, /* @__PURE__ */ React.createElement("table", { className: "text-sm text-right border-collapse", style: { tableLayout: "fixed", width: colWidths.c1 + colWidths.c2 + colWidths.c3 + visibleMonths.length * 102 } }, /* @__PURE__ */ React.createElement("colgroup", null, hasCategory ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("col", { style: { width: colWidths.c1 } }), /* @__PURE__ */ React.createElement("col", { style: { width: colWidths.c2 } }), /* @__PURE__ */ React.createElement("col", { style: { width: colWidths.c3 } })) : /* @__PURE__ */ React.createElement("col", { style: { width: colWidths.c1 + colWidths.c2 + colWidths.c3 } }), visibleMonths.map((m) => /* @__PURE__ */ React.createElement("col", { key: m, style: { width: 102 } }))), /* @__PURE__ */ React.createElement("thead", { className: "sticky top-0 z-40" }, /* @__PURE__ */ React.createElement("tr", { style: { background: "var(--ss-hdr-bg)" } }, hasCategory ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("th", { className: "sticky-c1-hdr p-2 text-center font-bold text-xs text-[var(--ss-hdr-text)] border-r border-[var(--ss-hdr-border)] overflow-hidden", style: { left: 0, width: colWidths.c1, minWidth: colWidths.c1, maxWidth: colWidths.c1 } }, "Category", /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-cyan-400 z-50 opacity-50", onMouseDown: (e) => setResizing({ col: "c1", startX: e.clientX, startW: colWidths.c1 }) })), /* @__PURE__ */ React.createElement("th", { className: "sticky-c2-hdr p-2 text-center font-bold text-xs text-[var(--ss-hdr-text)] border-r border-[var(--ss-hdr-border)] overflow-hidden", style: { left: colWidths.c1, width: colWidths.c2, minWidth: colWidths.c2, maxWidth: colWidths.c2 } }, "Subcategory", /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-cyan-400 z-50 opacity-50", onMouseDown: (e) => setResizing({ col: "c2", startX: e.clientX, startW: colWidths.c2 }) })), /* @__PURE__ */ React.createElement("th", { className: "sticky-c3-hdr p-2 text-center font-bold text-xs text-[var(--ss-hdr-text)] border-r-2 border-[var(--ss-hdr-border-strong)] overflow-hidden", style: { left: colWidths.c1 + colWidths.c2, width: colWidths.c3, minWidth: colWidths.c3, maxWidth: colWidths.c3 } }, "Item Name", /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-cyan-400 z-50 opacity-50", onMouseDown: (e) => setResizing({ col: "c3", startX: e.clientX, startW: colWidths.c3 }) }))) : /* @__PURE__ */ React.createElement("th", { className: "sticky-col-header p-2 text-left pl-3 font-bold text-xs text-[var(--ss-hdr-text)]", style: { left: 0, width: colWidths.c1 + colWidths.c2 + colWidths.c3, minWidth: colWidths.c1 + colWidths.c2 + colWidths.c3, maxWidth: colWidths.c1 + colWidths.c2 + colWidths.c3 } }, "Item Name"), visibleMonths.map((m) => /* @__PURE__ */ React.createElement("th", { key: m, className: `p-0 border-r border-[var(--ss-hdr-border)] font-bold text-center text-[var(--ss-hdr-text)] group/th relative border-b-2 border-b-[var(--ss-hdr-border-strong)] ${hiddenMonths.has(m) ? "opacity-50" : ""}`, style: { background: "var(--ss-hdr-bg)", minWidth: "102px", maxWidth: "102px", width: "102px" } }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center py-2 px-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[9px] text-slate-500 font-medium tracking-widest uppercase font-grotesk" }, m.split("-")[0]), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-300 font-grotesk" }, MONTH_NAMES[parseInt(m.split("-")[1]) - 1]), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    toggleHideMonth(m);
  }, className: `p-0.5 transition-colors ${hiddenMonths.has(m) ? "text-emerald-400" : "text-slate-500 hover:text-cyan-400"}`, title: hiddenMonths.has(m) ? "Show Column" : "Hide Column" }, hiddenMonths.has(m) ? /* @__PURE__ */ React.createElement(Icons.Eye, { className: "w-3 h-3" }) : /* @__PURE__ */ React.createElement(Icons.EyeOff, { className: "w-3 h-3" }))), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    handleDeleteMonth(m);
  }, className: "opacity-0 group-hover/th:opacity-100 p-0.5 text-slate-400 hover:text-rose-400 transition-all absolute top-0.5 right-0.5", title: "Delete Column" }, /* @__PURE__ */ React.createElement(Icons.X, { className: "w-2.5 h-2.5" }))))))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-[var(--ss-cell-border)]" }, (hasCategory ? Object.keys(categories) : ["ALL"]).map((catKey) => {
    const items = orderedItems[catKey] || [];
    const visibleItems = items.filter((i) => showHidden || !hiddenItems.has(i.itemKey || i.name));
    if (hasCategory && visibleItems.length === 0) return null;
    return /* @__PURE__ */ React.createElement(React.Fragment, { key: catKey }, visibleItems.map((item, idx) => {
      const iKey = item.itemKey || item.name;
      const isEditing = editingItemOption?.oldName === item.name && editingItemOption?.oldCat1 === (item.category || catKey) && editingItemOption?.oldCat2 === (item.category2 || "");
      const isFirstCat1 = isEditing || idx === 0;
      const isFirstCat2 = isEditing || idx === 0 || idx > 0 && visibleItems[idx - 1].category2 !== item.category2;
      return /* @__PURE__ */ React.createElement("tr", { key: iKey, className: `${idx % 2 === 0 ? "bg-[var(--ss-cell-bg)]" : "bg-[var(--ss-cell-bg-alt)]"} hover:bg-cyan-500/5 transition-colors group/row` }, hasCategory ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", { className: "sticky-c1 p-2 text-center text-xs font-bold text-slate-300 overflow-hidden", style: { left: 0, width: colWidths.c1, minWidth: colWidths.c1, maxWidth: colWidths.c1 } }, isEditing ? /* @__PURE__ */ React.createElement("select", { className: "w-full bg-slate-900 border border-white/10 text-white rounded focus:outline-none p-0.5 focus:border-cyan-400", value: editingItemOption.cat1, onChange: (e) => setEditingItemOption({ ...editingItemOption, cat1: e.target.value }) }, Object.entries(categories).map(([k, v]) => /* @__PURE__ */ React.createElement("option", { key: k, value: k }, v.label))) : isFirstCat1 ? /* @__PURE__ */ React.createElement("span", { className: "block truncate w-full" }, categories[catKey].label) : ""), /* @__PURE__ */ React.createElement("td", { className: "sticky-c2 p-2 text-center text-xs font-medium text-slate-400 overflow-hidden", style: { left: colWidths.c1, width: colWidths.c2, minWidth: colWidths.c2, maxWidth: colWidths.c2 } }, isEditing ? /* @__PURE__ */ React.createElement("input", { type: "text", className: "w-full bg-slate-900 border border-white/10 text-white rounded focus:outline-none p-0.5 text-center focus:border-cyan-400", value: editingItemOption.cat2, onChange: (e) => setEditingItemOption({ ...editingItemOption, cat2: e.target.value }), onKeyDown: (e) => e.key === "Enter" && handleSaveRowEdit() }) : isFirstCat2 ? /* @__PURE__ */ React.createElement("span", { className: "block truncate w-full" }, item.category2 || "") : ""), /* @__PURE__ */ React.createElement("td", { className: "sticky-c3 p-2 overflow-hidden", style: { left: colWidths.c1 + colWidths.c2, width: colWidths.c3, minWidth: colWidths.c3, maxWidth: colWidths.c3 } }, isEditing ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("input", { type: "text", autoFocus: true, className: "w-full bg-slate-900 border border-white/10 text-white rounded focus:outline-none p-0.5 text-xs focus:border-cyan-400", value: editingItemOption.newName, onChange: (e) => setEditingItemOption({ ...editingItemOption, newName: e.target.value }), onKeyDown: (e) => e.key === "Enter" && handleSaveRowEdit() }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-0.5 ml-1" }, /* @__PURE__ */ React.createElement("button", { onClick: handleSaveRowEdit, className: "p-1 text-emerald-400 hover:bg-emerald-500/20 rounded" }, /* @__PURE__ */ React.createElement(Icons.Check, { className: "w-3 h-3" })), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingItemOption(null), className: "p-1 text-slate-400 hover:bg-white/10 rounded" }, /* @__PURE__ */ React.createElement(Icons.X, { className: "w-3 h-3" })))) : /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between group" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 overflow-hidden w-full" }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleHide(iKey), className: "text-slate-500 hover:text-cyan-400 transition-colors shrink-0" }, hiddenItems.has(iKey) ? /* @__PURE__ */ React.createElement(Icons.EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ React.createElement(Icons.Eye, { className: "w-3.5 h-3.5" })), /* @__PURE__ */ React.createElement("span", { className: `text-xs font-bold truncate ${hiddenItems.has(iKey) ? "text-slate-500 line-through" : "text-slate-300"}`, title: item.name }, item.name)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center opacity-0 group-hover:opacity-100 transition-all shrink-0" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingItemOption({ oldName: item.name, newName: item.name, cat1: item.category || catKey, cat2: item.category2 || "", oldCat1: item.category || catKey, oldCat2: item.category2 || "" }), className: "p-1 text-slate-500 hover:text-cyan-400" }, /* @__PURE__ */ React.createElement(Icons.Edit2, { className: "w-3.5 h-3.5" })), /* @__PURE__ */ React.createElement("button", { onClick: () => handleDeleteRow(iKey, item.name), className: "p-1 text-slate-500 hover:text-rose-400" }, /* @__PURE__ */ React.createElement(Icons.Trash2, { className: "w-3.5 h-3.5" })))))) : /* @__PURE__ */ React.createElement("td", { className: "sticky left-0 z-20 p-2 border-r border-white/5", style: { minWidth: colWidths.c1 + colWidths.c2 + colWidths.c3, maxWidth: colWidths.c1 + colWidths.c2 + colWidths.c3, width: colWidths.c1 + colWidths.c2 + colWidths.c3, backgroundColor: "var(--ss-sticky-bg)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" } }, isEditing ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("input", { type: "text", autoFocus: true, className: "w-full bg-slate-900 border border-white/10 text-white rounded focus:outline-none p-0.5 text-xs focus:border-cyan-400", value: editingItemOption.newName, onChange: (e) => setEditingItemOption({ ...editingItemOption, newName: e.target.value }), onKeyDown: (e) => e.key === "Enter" && handleSaveRowEdit() }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-0.5 ml-1" }, /* @__PURE__ */ React.createElement("button", { onClick: handleSaveRowEdit, className: "p-1 text-emerald-400 hover:bg-emerald-500/20 rounded" }, /* @__PURE__ */ React.createElement(Icons.Check, { className: "w-3 h-3" })), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingItemOption(null), className: "p-1 text-slate-400 hover:bg-white/10 rounded" }, /* @__PURE__ */ React.createElement(Icons.X, { className: "w-3 h-3" })))) : /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between group" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 overflow-hidden w-full" }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleHide(iKey), className: "text-slate-500 hover:text-cyan-400 transition-colors shrink-0" }, hiddenItems.has(iKey) ? /* @__PURE__ */ React.createElement(Icons.EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ React.createElement(Icons.Eye, { className: "w-3.5 h-3.5" })), /* @__PURE__ */ React.createElement("span", { className: `text-xs font-bold truncate ${hiddenItems.has(iKey) ? "text-slate-500 line-through" : "text-slate-300"}`, title: item.name }, item.name)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center opacity-0 group-hover:opacity-100 transition-all shrink-0" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingItemOption({ oldName: item.name, newName: item.name, cat1: item.category || "ALL", cat2: "", oldCat1: item.category || "ALL", oldCat2: "" }), className: "p-1 text-slate-500 hover:text-cyan-400" }, /* @__PURE__ */ React.createElement(Icons.Edit2, { className: "w-3.5 h-3.5" })), /* @__PURE__ */ React.createElement("button", { onClick: () => handleDeleteRow(iKey, item.name), className: "p-1 text-slate-500 hover:text-rose-400" }, /* @__PURE__ */ React.createElement(Icons.Trash2, { className: "w-3.5 h-3.5" }))))), visibleMonths.map((month) => {
        const found = (safeData[month][listKey] || []).find((i) => {
          if (!hasCategory) {
            return i.name === item.name;
          }
          const iCat = categories[i.category] ? i.category : Object.keys(categories)[0];
          const iCat2 = i.category2 || "";
          return i.name === item.name && iCat === (item.category || catKey) && iCat2 === (item.category2 || "");
        });
        if (type === "stockProfit") {
          const isCatDividend = item.category === "DIVIDEND";
          const fieldKey = isCatDividend ? "dividend" : "profit";
          const val = found ? found[fieldKey] || 0 : 0;
          return /* @__PURE__ */ React.createElement("td", { key: month, className: "p-0 border-r border-[var(--ss-cell-border)]", style: { minWidth: "102px", maxWidth: "102px", width: "102px" } }, /* @__PURE__ */ React.createElement(CurrencyInput, { value: val, onChange: (v) => handleCellChange(month, item.name, fieldKey, v, item.category, item.category2), className: `w-full h-full p-2 text-right bg-transparent focus:bg-cyan-500/10 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-cyan-500/20 text-xs font-mono hover:bg-white/5 transition-colors ${val < 0 ? "text-cyan-400 font-bold" : val > 0 ? isCatDividend ? "text-emerald-400 font-bold" : "text-fuchsia-400 font-bold" : "text-slate-600"}` }));
        } else {
          const val = found ? found.value ?? found.amount ?? 0 : 0;
          const fieldName = type === "assets" ? "value" : "amount";
          return /* @__PURE__ */ React.createElement("td", { key: month, className: "p-0 border-r border-[var(--ss-cell-border)]", style: { minWidth: "102px", maxWidth: "102px", width: "102px" } }, /* @__PURE__ */ React.createElement(CurrencyInput, { value: val, onChange: (v) => handleCellChange(month, item.name, fieldName, v, item.category, item.category2), className: "w-full h-full p-2 text-right bg-transparent focus:bg-cyan-500/10 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-cyan-500/20 text-xs font-mono text-slate-200 hover:bg-white/5 transition-colors" }));
        }
      }));
    }), hasCategory && /* @__PURE__ */ React.createElement("tr", { style: { background: "var(--ss-sum-bg)" }, className: "font-bold text-cyan-400 border-t border-[var(--ss-sum-border)]" }, /* @__PURE__ */ React.createElement("td", { className: "sticky-c-sum p-2 text-right text-xs text-cyan-400 font-grotesk", colSpan: 3, style: { left: 0, paddingRight: "0.75rem" } }, categories[catKey].label, " Total"), visibleMonths.map((month) => {
      const sum = visibleItems.reduce((acc, item) => {
        const found = (safeData[month][listKey] || []).find((i) => {
          const iCat = hasCategory && categories[i.category] ? i.category : hasCategory ? Object.keys(categories)[0] : "ALL";
          const iCat2 = i.category2 || "";
          const itemCat = hasCategory && categories[item.category] ? item.category : hasCategory ? Object.keys(categories)[0] : "ALL";
          const itemCat2 = item.category2 || "";
          return i.name === item.name && iCat === itemCat && iCat2 === itemCat2;
        });
        let val = 0;
        if (found) {
          if (type === "stockProfit") {
            val = item.category === "DIVIDEND" ? evaluateFormula(found.dividend) || 0 : evaluateFormula(found.profit) || 0;
          } else {
            val = found.value ?? found.amount ?? 0;
          }
        }
        return acc + (typeof val === "number" ? val : evaluateFormula(val));
      }, 0);
      return /* @__PURE__ */ React.createElement("td", { key: month, className: "p-2 text-right border-r border-[var(--ss-hdr-border)] text-xs font-bold text-cyan-400 font-grotesk", style: { background: "var(--ss-sum-bg)", minWidth: "102px", maxWidth: "102px", width: "102px" } }, formatCurrency(sum));
    })));
  })))));
};
const OWNERSHIP_TYPES = {
  OWN: { label: "Owned", color: "bg-cyan-500", text: "text-cyan-400", light: "bg-cyan-500/10" },
  JEONSE: { label: "Jeonse", color: "bg-emerald-500", text: "text-emerald-400", light: "bg-emerald-500/10" },
  RENT: { label: "Rent", color: "bg-amber-500", text: "text-amber-400", light: "bg-amber-500/10" }
};
const RealEstateSheet = ({ data, onUpdate }) => {
  const realEstate = data.realEstate || [];
  const [newItem, setNewItem] = useState({ name: "", category: "APARTMENT", ownershipType: "OWN", purchaseDate: "", purchasePrice: 0, currentValue: 0, loan: 0, deposit: 0, monthlyRent: 0 });
  const stats = useMemo(() => {
    const totalValue = realEstate.reduce((acc, item) => acc + (Number(item.currentValue) || 0), 0);
    const totalLoanDeposit = realEstate.reduce((acc, item) => acc + (Number(item.loan) || 0) + (Number(item.deposit) || 0), 0);
    const totalRent = realEstate.reduce((acc, item) => acc + (Number(item.monthlyRent) || 0), 0);
    return { totalValue, netWorth: totalValue - totalLoanDeposit, totalRent, count: realEstate.length };
  }, [realEstate]);
  const handleAddItem = () => {
    if (!newItem.name) return;
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.realEstate) newData.realEstate = [];
    newData.realEstate.push({ ...newItem, id: Date.now() });
    onUpdate(newData);
    setNewItem({ name: "", category: "APARTMENT", ownershipType: "OWN", purchaseDate: "", purchasePrice: 0, currentValue: 0, loan: 0, deposit: 0, monthlyRent: 0 });
  };
  const handleUpdateItem = (id, field, value) => {
    const newData = JSON.parse(JSON.stringify(data));
    const item = newData.realEstate.find((i) => i.id === id);
    if (item) {
      item[field] = value;
      onUpdate(newData);
    }
  };
  const handleDeleteItem = (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    const newData = JSON.parse(JSON.stringify(data));
    newData.realEstate = newData.realEstate.filter((i) => i.id !== id);
    onUpdate(newData);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(GlassCard, { className: "p-5 border-l-4 border-cyan-500" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "Total Property Value"), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-black text-white mt-1 font-grotesk" }, formatCurrency(stats.totalValue))), /* @__PURE__ */ React.createElement(GlassCard, { className: "p-5 border-l-4 border-emerald-500" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "Real Estate Net Worth"), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-black text-emerald-400 mt-1 font-grotesk" }, formatCurrency(stats.netWorth))), /* @__PURE__ */ React.createElement(GlassCard, { className: "p-5 border-l-4 border-rose-500" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "Total Loans & Deposits"), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-black text-rose-400 mt-1 font-grotesk" }, formatCurrency(stats.totalValue - stats.netWorth))), /* @__PURE__ */ React.createElement(GlassCard, { className: "p-5 border-l-4 border-amber-500" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "Total Monthly Rent"), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-black text-amber-400 mt-1 font-grotesk" }, formatCurrency(stats.totalRent)))), /* @__PURE__ */ React.createElement(CollapsibleCard, { title: "Register New Property", icon: Icons.Plus, initialOpen: false }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, "Property Name"), /* @__PURE__ */ React.createElement("input", { type: "text", placeholder: "e.g. Raemian 84A", className: "w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:ring-2 focus:ring-cyan-500/20 outline-none focus:border-cyan-500/30", value: newItem.name, onChange: (e) => setNewItem({ ...newItem, name: e.target.value }) })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, "Property Type"), /* @__PURE__ */ React.createElement("select", { className: "w-full p-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-slate-300 outline-none focus:border-cyan-500/30", value: newItem.category, onChange: (e) => setNewItem({ ...newItem, category: e.target.value }) }, Object.entries(REAL_ESTATE_CATEGORIES).map(([k, v]) => /* @__PURE__ */ React.createElement("option", { key: k, value: k }, v.label)))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, "Ownership Type"), /* @__PURE__ */ React.createElement("div", { className: "flex bg-black/30 p-1 rounded-xl gap-1 border border-white/10" }, Object.entries(OWNERSHIP_TYPES).map(([k, v]) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: k,
      onClick: () => setNewItem({ ...newItem, ownershipType: k }),
      className: `flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${newItem.ownershipType === k ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-slate-400 hover:text-slate-300"}`
    },
    v.label
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, "Purchase Date"), /* @__PURE__ */ React.createElement("input", { type: "text", placeholder: "YYYY-MM-DD", className: "w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-cyan-500/30", value: newItem.purchaseDate, onChange: (e) => setNewItem({ ...newItem, purchaseDate: e.target.value }) })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, newItem.ownershipType === "OWN" ? "Purchase Price" : "Deposit Amount"), /* @__PURE__ */ React.createElement(CurrencyInput, { value: newItem.purchasePrice, onChange: (v) => setNewItem({ ...newItem, purchasePrice: v }), className: "w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, "Current Value"), /* @__PURE__ */ React.createElement(CurrencyInput, { value: newItem.currentValue, onChange: (v) => setNewItem({ ...newItem, currentValue: v }), className: "w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, "Loan Balance"), /* @__PURE__ */ React.createElement(CurrencyInput, { value: newItem.loan, onChange: (v) => setNewItem({ ...newItem, loan: v }), className: "w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, "Deposit (Paid/Received)"), /* @__PURE__ */ React.createElement(CurrencyInput, { value: newItem.deposit, onChange: (v) => setNewItem({ ...newItem, deposit: v }), className: "w-full p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-[10px] font-bold text-slate-400 ml-1" }, "Monthly Rent"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(CurrencyInput, { value: newItem.monthlyRent, onChange: (v) => setNewItem({ ...newItem, monthlyRent: v }), className: "flex-1 p-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500/30" }), /* @__PURE__ */ React.createElement("button", { onClick: handleAddItem, className: "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-6 rounded-xl font-bold hover:bg-cyan-500/20 transition-all shadow-lg active:scale-95 shadow-cyan-500/5" }, "Register"))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, realEstate.map((item) => {
    const cat = REAL_ESTATE_CATEGORIES[item.category] || REAL_ESTATE_CATEGORIES.OTHER;
    const own = OWNERSHIP_TYPES[item.ownershipType] || OWNERSHIP_TYPES.OWN;
    const investment = (Number(item.purchasePrice) || 0) - (Number(item.deposit) || 0);
    const yieldRate = investment > 0 ? ((Number(item.monthlyRent) || 0) * 12 / investment * 100).toFixed(2) : 0;
    const profit = (Number(item.currentValue) || 0) - (Number(item.purchasePrice) || 0);
    const profitRate = (Number(item.purchasePrice) || 0) > 0 ? (profit / item.purchasePrice * 100).toFixed(1) : 0;
    return /* @__PURE__ */ React.createElement(GlassCard, { key: item.id, className: "overflow-hidden flex flex-col hover:border-cyan-500/20 hover:shadow-cyan-500/5 hover:-translate-y-0.5 transition-all duration-300" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-[#191b32]/40 border-b border-white/5 flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-white/5 rounded-lg border border-white/10" }, /* @__PURE__ */ React.createElement(Icons.Home, { className: `w-5 h-5 ${cat.text}` })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${own.light} ${own.text} border border-current` }, own.label), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${cat.bg} ${cat.text} border border-current opacity-70` }, cat.label), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-200" }, item.name)), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-500 font-medium" }, "Contract Date: ", item.purchaseDate || "-"))), /* @__PURE__ */ React.createElement("button", { onClick: () => handleDeleteItem(item.id), className: "p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors" }, /* @__PURE__ */ React.createElement(Icons.Trash2, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("div", { className: "p-6 grid grid-cols-2 sm:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold text-slate-500 uppercase mb-1" }, "Current Value"), /* @__PURE__ */ React.createElement(CurrencyInput, { value: item.currentValue, onChange: (v) => handleUpdateItem(item.id, "currentValue", v), className: "text-xl font-black text-white p-1 rounded-lg w-full bg-transparent focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/20" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 mt-1" }, /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-bold ${profit >= 0 ? "text-rose-400" : "text-cyan-400"}` }, profit >= 0 ? "\u25B2" : "\u25BC", " ", formatCurrency(Math.abs(profit)), " (", profitRate, "%)"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold text-slate-500 uppercase mb-1" }, "Loan Balance"), /* @__PURE__ */ React.createElement(CurrencyInput, { value: item.loan, onChange: (v) => handleUpdateItem(item.id, "loan", v), className: "text-xl font-black text-slate-300 p-1 rounded-lg w-full bg-transparent focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/20" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold text-slate-500 uppercase mb-1" }, "Deposit / Rent"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement(CurrencyInput, { value: item.deposit, onChange: (v) => handleUpdateItem(item.id, "deposit", v), className: "text-sm font-bold text-slate-300 p-1 rounded-lg w-full bg-transparent focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/20" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(CurrencyInput, { value: item.monthlyRent, onChange: (v) => handleUpdateItem(item.id, "monthlyRent", v), className: "text-base font-black text-cyan-400 p-1 rounded-lg w-full bg-transparent focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/20" }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-grotesk" }, "Annual ", yieldRate, "%"))))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-3 bg-[#10122c]/40 border-t border-white/5 flex justify-between items-center text-xs text-slate-400" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-500" }, item.ownershipType === "OWN" ? "Purchase Price" : "Deposit Amount", ": ", formatCurrency(item.purchasePrice)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-500" }, "Actual Invested: ", formatCurrency(investment)), /* @__PURE__ */ React.createElement("div", { className: "h-3 w-px bg-white/5" }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-300 uppercase font-grotesk" }, "Net Worth: ", formatCurrency(item.currentValue - item.loan - item.deposit)))));
  }), realEstate.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "col-span-full py-20 flex flex-col items-center justify-center text-slate-500 border border-dashed border-cyan-500/15 rounded-3xl" }, /* @__PURE__ */ React.createElement(Icons.Building2, { className: "w-16 h-16 mb-4 opacity-40 text-cyan-400" }), /* @__PURE__ */ React.createElement("p", { className: "font-bold" }, "No registered real estate assets."), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-1 text-slate-600" }, "Add a new asset using the registration form above."))));
};
const SalarySheet = ({ data, onUpdate }) => {
  const salaryData = data.salary || { years: Array.from({ length: 12 }, (_, i) => String(2014 + i)), items: [{ id: 1, name: "\uC735\uAE30", values: {} }, { id: 2, name: "\uC218\uC544", values: {} }] };
  const [years, setYears] = useState(salaryData.years);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (data.salary) setYears(data.salary.years);
  }, [data.salary]);
  const handleValueChange = (itemId, year, val) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.salary) newData.salary = salaryData;
    const item = newData.salary.items.find((i) => i.id === itemId);
    if (item) {
      item.values[year] = val;
      onUpdate(newData);
    }
  };
  const addYear = () => {
    const lastYear = parseInt(years[years.length - 1]);
    const newYear = String(lastYear + 1);
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.salary) newData.salary = salaryData;
    newData.salary.years.push(newYear);
    newData.salary.items.forEach((item) => item.values[newYear] = 0);
    onUpdate(newData);
  };
  const handleDeleteYear = (yearToDelete) => {
    if (!confirm(`Delete data for ${yearToDelete}?`)) return;
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.salary) return;
    newData.salary.years = newData.salary.years.filter((y) => y !== yearToDelete);
    newData.salary.items.forEach((item) => {
      if (item.values) delete item.values[yearToDelete];
    });
    onUpdate(newData);
  };
  const chartData = years.map((year) => {
    const point = { year };
    salaryData.items.forEach((item) => point[item.name] = item.values[year] || 0);
    return point;
  });
  const itemTotals = salaryData.items.map((item) => ({ id: item.id, name: item.name, total: Object.values(item.values).reduce((acc, val) => acc + (Number(val) || 0), 0) }));
  const grandTotal = itemTotals.reduce((acc, curr) => acc + curr.total, 0);
  const getLevel = (total) => {
    if (total > 2e9) return { label: "Generational Wealth Owner", color: "text-amber-400", emoji: "\u{1F3F0}" };
    if (total > 1e9) return { label: "Rising Capitalist", color: "text-emerald-400", emoji: "\u{1F3D9}\uFE0F" };
    if (total > 5e8) return { label: "Professional Earner", color: "text-cyan-400", emoji: "\u2615" };
    if (total > 1e8) return { label: "Diligent Ant", color: "text-blue-400", emoji: "\u{1F41C}" };
    return { label: "Passion-Filled Rookie", color: "text-slate-500", emoji: "\u{1F95A}" };
  };
  const mainLevel = getLevel(grandTotal);
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-cyan-950/60 to-fuchsia-950/60 border border-white/10 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }), /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-2 font-grotesk" }, "Our Lifetime Earnings"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row md:items-end gap-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-5xl font-black tracking-tighter font-grotesk" }, formatCurrency(grandTotal)), /* @__PURE__ */ React.createElement("span", { className: `text-sm font-bold bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-1 flex items-center gap-2` }, /* @__PURE__ */ React.createElement("span", null, mainLevel.emoji), /* @__PURE__ */ React.createElement("span", { className: "font-grotesk" }, mainLevel.label))), /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-slate-400 text-sm font-medium" }, '"Hard work pays off! \u{1F969} We will be richer tomorrow than we are today."'))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, itemTotals.map((it) => {
    const lv = getLevel(it.total);
    const displayName = it.name === "\uC735\uAE30" ? "Yungki" : it.name === "\uC218\uC544" ? "Sua" : it.name;
    return /* @__PURE__ */ React.createElement(GlassCard, { key: it.id, className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider" }, "Cumulative Earnings (", displayName, ")"), /* @__PURE__ */ React.createElement("h3", { className: "text-3xl font-black text-white tracking-tight mt-1 font-grotesk" }, formatCurrency(it.total))), /* @__PURE__ */ React.createElement("div", { className: "text-2xl" }, lv.emoji)), /* @__PURE__ */ React.createElement("div", { className: `text-xs font-bold ${lv.color} bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg inline-block font-grotesk` }, "Level: ", lv.label));
  })), /* @__PURE__ */ React.createElement(GlassCard, { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-md font-bold text-white flex items-center gap-2 font-grotesk" }, /* @__PURE__ */ React.createElement(Icons.TrendingUp, { className: "w-5 h-5 text-cyan-400" }), " Walkwise of Lifetime Earnings"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500 font-bold uppercase font-grotesk" }, "Income History Chart")), /* @__PURE__ */ React.createElement("div", { className: "h-72" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(LineChart, { data: chartData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255, 255, 255, 0.05)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "year", fontSize: 12, stroke: "#64748b", axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 12, width: 60, stroke: "#64748b", tickFormatter: (val) => val >= 1e6 ? `${(val / 1e6).toFixed(0)}M` : `${(val / 1e3).toFixed(0)}k`, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(RechartsTooltip, { formatter: (val) => formatCurrency(val), contentStyle: { background: "rgba(10, 11, 22, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", color: "#e2e8f0" } }), /* @__PURE__ */ React.createElement(Legend, { iconType: "circle" }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "\uC735\uAE30", name: "Yungki", stroke: "#06b6d4", strokeWidth: 4, dot: { r: 4, strokeWidth: 2, fill: "#0f1026" }, activeDot: { r: 8, strokeWidth: 0 } }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "\uC218\uC544", name: "Sua", stroke: "#ec4899", strokeWidth: 4, dot: { r: 4, strokeWidth: 2, fill: "#0f1026" }, activeDot: { r: 8, strokeWidth: 0 } }))))), /* @__PURE__ */ React.createElement(GlassCard, { className: "flex flex-col overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-[#191b32]/40 border-b border-white/5 flex justify-between items-center backdrop-blur-md" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-white text-sm font-grotesk" }, "Yearly Salary Details"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 font-medium mt-0.5 font-grotesk" }, "Unit: KRW (Gross income recommended)")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("button", { onClick: addYear, className: "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-cyan-500/20 transition-all font-bold text-xs shadow-none active:scale-95" }, /* @__PURE__ */ React.createElement(Icons.Plus, { className: "w-4 h-4" }), " Add Year"), /* @__PURE__ */ React.createElement("input", { type: "file", accept: ".csv", ref: fileInputRef, className: "hidden", onChange: (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text.split(/\r\n|\n|\r/).filter((l) => l.trim() !== "");
      if (lines.length < 2) return;
      const header = lines[0].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
      const fileYears = header.slice(1);
      const newData = JSON.parse(JSON.stringify(data));
      if (!newData.salary) newData.salary = { years: [], items: [] };
      const allYears = Array.from(/* @__PURE__ */ new Set([...newData.salary.years, ...fileYears])).sort();
      newData.salary.years = allYears;
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
        if (row.length < 2) continue;
        const name = row[0];
        let item = newData.salary.items.find((it) => it.name === name);
        if (!item) {
          item = { id: Date.now() + i, name, values: {} };
          newData.salary.items.push(item);
        }
        fileYears.forEach((year, idx) => {
          item.values[year] = parseFloat(row[idx + 1] || 0);
        });
      }
      onUpdate(newData);
      alert("Data successfully imported! \u{1F680}");
    };
    reader.readAsText(file);
  } }), /* @__PURE__ */ React.createElement(GlassButton, { onClick: () => fileInputRef.current.click() }, /* @__PURE__ */ React.createElement(Icons.Upload, { className: "w-3.5 h-3.5" }), " Upload"), /* @__PURE__ */ React.createElement(GlassButton, { onClick: () => {
    const totalRow = salaryData.items.reduce((acc, item) => acc + Object.values(item.values).reduce((a, v) => a + (Number(v) || 0), 0), 0);
    let csvRows = "Name,Total," + years.join(",") + "\n";
    salaryData.items.forEach((item) => {
      const displayName = item.name === "\uC735\uAE30" ? "Yungki" : item.name === "\uC218\uC544" ? "Sua" : item.name;
      const itemTotal = Object.values(item.values).reduce((a, v) => a + (Number(v) || 0), 0);
      csvRows += `"${displayName}",${itemTotal},` + years.map((y) => item.values[y] || 0).join(",") + "\n";
    });
    const blob = new Blob(["\uFEFF" + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Salary_Management.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } }, /* @__PURE__ */ React.createElement(Icons.Download, { className: "w-3.5 h-3.5" }), " Download"))), /* @__PURE__ */ React.createElement("div", { className: "overflow-auto custom-scrollbar", ref: containerRef }, /* @__PURE__ */ React.createElement("table", { className: "min-w-full text-sm text-right" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-[#191b32]/40 text-slate-400 font-grotesk" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "p-4 text-left w-28 font-bold border-r border-white/5 sticky left-0 bg-[#191b32]/95 backdrop-blur-sm z-20" }, "Name"), /* @__PURE__ */ React.createElement("th", { className: "p-4 w-32 font-black text-cyan-400 border-r border-white/10 sticky left-28 bg-[#1a2d42]/95 backdrop-blur-sm z-20" }, "Total"), years.map((year) => /* @__PURE__ */ React.createElement("th", { key: year, "data-year": year, className: "p-4 min-w-[97px] font-bold border-r border-white/5 last:border-0 group/th relative" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-1" }, year, /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    handleDeleteYear(year);
  }, className: "opacity-0 group-hover/th:opacity-100 p-1.5 hover:bg-rose-500/20 rounded-lg text-rose-400 transition-all absolute right-1 top-1/2 -translate-y-1/2", title: "Delete Year" }, /* @__PURE__ */ React.createElement(Icons.X, { className: "w-3 h-3" }))))))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-white/5" }, salaryData.items.map((item, idx) => {
    const itemTotal = Object.values(item.values).reduce((acc, val) => acc + (Number(val) || 0), 0);
    const displayName = item.name === "\uC735\uAE30" ? "Yungki" : item.name === "\uC218\uC544" ? "Sua" : item.name;
    return /* @__PURE__ */ React.createElement("tr", { key: item.id, className: `hover:bg-white/5 transition-colors group/tr ${idx % 2 === 0 ? "bg-[var(--ss-cell-bg)]" : "bg-[var(--ss-cell-bg-alt)]"}` }, /* @__PURE__ */ React.createElement("td", { className: "p-4 text-left font-extrabold text-slate-300 bg-[var(--ss-sticky-bg)] sticky left-0 border-r border-white/5 z-10 group-hover/tr:bg-white/5 transition-colors" }, displayName), /* @__PURE__ */ React.createElement("td", { className: "p-4 text-right font-black text-cyan-400 bg-[var(--ss-sum-bg)] sticky left-28 border-r border-white/10 z-10 group-hover/tr:bg-white/5 transition-colors" }, formatCurrency(itemTotal)), years.map((year) => /* @__PURE__ */ React.createElement("td", { key: year, className: "p-0 border-r border-white/5" }, /* @__PURE__ */ React.createElement(CurrencyInput, { value: item.values[year] || 0, onChange: (val) => handleValueChange(item.id, year, val), className: "w-full h-full p-4 text-right bg-transparent focus:bg-cyan-500/10 outline-none text-xs font-mono text-slate-300 hover:bg-white/5 transition-all" }))));
  }))))));
};
const SyncModal = ({ isOpen, onClose, currentId, onSyncIdChange }) => {
  const [inputValue, setInputValue] = useState("");
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f1026] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl m-4", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-white flex items-center gap-2 font-grotesk" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20" }, /* @__PURE__ */ React.createElement(Icons.Cloud, { className: "w-5 h-5" })), "Data Sync"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "text-slate-500 hover:text-white" }, /* @__PURE__ */ React.createElement(Icons.X, { className: "w-5 h-5" }))), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/5 p-4 rounded-xl border border-white/10" }, /* @__PURE__ */ React.createElement("label", { className: "block text-xs font-bold text-slate-400 uppercase mb-2 font-grotesk" }, "Current Sync Key"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("code", { className: "flex-1 bg-black/35 border border-white/10 rounded-lg p-3 text-xs font-mono text-slate-300 break-all select-all" }, currentId), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    navigator.clipboard.writeText(currentId);
    alert("Sync key copied!");
  }, className: "p-3 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors" }, /* @__PURE__ */ React.createElement(Icons.Copy, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-500 mt-2" }, "* Copy this key and input it on another device to sync data.")), /* @__PURE__ */ React.createElement("div", { className: "border-t border-white/5 pt-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-bold text-slate-300 mb-2 font-grotesk" }, "Load Data from Another Device"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), placeholder: "Enter Sync Key", className: "flex-1 bg-black/25 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20" }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (confirm("Are you sure you want to load data? Your current local data will be overwritten.")) {
      onSyncIdChange(inputValue.trim());
      onClose();
    }
  }, disabled: !inputValue.trim(), className: "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-cyan-500/20 disabled:opacity-50 transition-colors" }, "Load"))))));
};
const SliderInput = ({ label, value, min, max, step = 1, unit = "", onChange, formatter = (v) => v }) => /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("label", { className: "text-[11px] font-bold text-slate-500 uppercase tracking-widest font-grotesk" }, label), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded font-mono" }, formatter(value), unit)), /* @__PURE__ */ React.createElement(
  "input",
  {
    type: "range",
    min,
    max,
    step,
    value,
    onChange: (e) => onChange(Number(e.target.value)),
    className: "w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
  }
));
const LoanCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(5e8);
  const [equityRatio, setEquityRatio] = useState(30);
  const [rate, setRate] = useState(3.5);
  const [term, setTerm] = useState(30);
  const [gracePeriod, setGracePeriod] = useState(0);
  const [type, setType] = useState("level");
  const loanAmount = useMemo(() => purchasePrice * (1 - equityRatio / 100), [purchasePrice, equityRatio]);
  const results = useMemo(() => {
    const L = loanAmount;
    const r = rate / 100 / 12;
    const n = term * 12;
    const g = gracePeriod * 12;
    let monthlyPayment = 0;
    let totalInterest = 0;
    const yearlyData = [];
    if (r === 0) {
      const mp = L / (n - g);
      return { monthlyPayment: mp, totalInterest: 0, totalPayment: L, yearlyData: [] };
    }
    let currentBalance = L;
    let cumulativeInterest = 0;
    for (let year = 1; year <= term; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let month = 1; month <= 12; month++) {
        const currentMonth = (year - 1) * 12 + month;
        let mInterest = currentBalance * r;
        let mPrincipal = 0;
        if (currentMonth <= g) {
          mPrincipal = 0;
        } else {
          if (type === "level") {
            const remainingMonths = n - g;
            const mp = L * r * Math.pow(1 + r, remainingMonths) / (Math.pow(1 + r, remainingMonths) - 1);
            monthlyPayment = mp;
            mPrincipal = mp - mInterest;
          } else if (type === "principal") {
            mPrincipal = L / (n - g);
            monthlyPayment = mPrincipal + mInterest;
          } else if (type === "maturity") {
            mPrincipal = 0;
            monthlyPayment = mInterest;
          }
        }
        if (type === "maturity" && currentMonth === n) {
          mPrincipal = L;
        }
        yearPrincipal += mPrincipal;
        yearInterest += mInterest;
        currentBalance -= mPrincipal;
        cumulativeInterest += mInterest;
      }
      yearlyData.push({
        name: `${year} Yr`,
        Principal: Math.round(yearPrincipal),
        Interest: Math.round(yearInterest)
      });
    }
    let displayMonthly = 0;
    if (type === "level") {
      const remainingMonths = n - g;
      displayMonthly = L * r * Math.pow(1 + r, remainingMonths) / (Math.pow(1 + r, remainingMonths) - 1);
    } else if (type === "principal") {
      displayMonthly = L / (n - g) + L * r;
    } else {
      displayMonthly = L * r;
    }
    return {
      monthlyPayment: displayMonthly,
      totalInterest: cumulativeInterest,
      totalPayment: L + cumulativeInterest,
      yearlyData
    };
  }, [loanAmount, rate, term, gracePeriod, type]);
  return /* @__PURE__ */ React.createElement(GlassCard, { className: "p-6 h-full flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20" }, /* @__PURE__ */ React.createElement(Icons.Calculator, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-bold text-white font-grotesk" }, "Loan Simulator")), /* @__PURE__ */ React.createElement("div", { className: "flex bg-black/30 p-1 rounded-xl gap-1 border border-white/10" }, ["level", "principal", "maturity"].map((t) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: t,
      onClick: () => setType(t),
      className: `px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${type === t ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" : "text-slate-400 hover:text-slate-300"}`
    },
    t === "level" ? "Amortization" : t === "principal" ? "Equal Principal" : "Maturity"
  )))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement(
    SliderInput,
    {
      label: "Purchase Price",
      value: purchasePrice,
      min: 5e7,
      max: 2e9,
      step: 1e7,
      unit: " KRW",
      formatter: (v) => (v / 1e8).toFixed(1) + " 100M",
      onChange: setPurchasePrice
    }
  ), /* @__PURE__ */ React.createElement(
    SliderInput,
    {
      label: "Equity Ratio",
      value: equityRatio,
      min: 0,
      max: 100,
      unit: "%",
      onChange: setEquityRatio
    }
  ), /* @__PURE__ */ React.createElement(
    SliderInput,
    {
      label: "Interest Rate",
      value: rate,
      min: 1,
      max: 15,
      step: 0.1,
      unit: "%",
      onChange: setRate
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
    SliderInput,
    {
      label: "Loan Term",
      value: term,
      min: 1,
      max: 50,
      unit: " Yrs",
      onChange: setTerm
    }
  ), /* @__PURE__ */ React.createElement(
    SliderInput,
    {
      label: "Grace Period",
      value: gracePeriod,
      min: 0,
      max: Math.min(term, 10),
      unit: " Yrs",
      onChange: setGracePeriod
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-white/10 rounded-2xl text-white shadow-xl relative overflow-hidden shadow-cyan-500/5" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 flex flex-col gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold text-cyan-400 uppercase tracking-widest opacity-80 mb-1 font-grotesk" }, "Estimated Loan Amount"), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-black font-grotesk" }, formatCurrency(loanAmount))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4 pt-4 border-t border-white/10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold text-slate-400" }, type === "principal" ? "Monthly Payment (Max)" : "Monthly Payment"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-black font-grotesk text-white" }, formatCurrency(results.monthlyPayment))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold text-slate-400" }, "Total Interest Paid"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-black font-grotesk text-white" }, formatCurrency(results.totalInterest))))))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement("p", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 font-grotesk" }, "Yearly Principal & Interest Breakdown"), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-h-[300px]" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(BarChart, { data: results.yearlyData, margin: { top: 10, right: 10, left: 0, bottom: 0 } }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255, 255, 255, 0.05)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", fontSize: 10, stroke: "#94a3b8", axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 10, stroke: "#94a3b8", axisLine: false, tickLine: false, tickFormatter: (val) => val >= 1e6 ? `${(val / 1e6).toFixed(1)}M` : val >= 1e3 ? `${(val / 1e3).toFixed(0)}k` : val }), /* @__PURE__ */ React.createElement(
    RechartsTooltip,
    {
      cursor: { fill: "rgba(255, 255, 255, 0.02)" },
      formatter: (v) => formatCurrency(v),
      contentStyle: { background: "rgba(10, 11, 22, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", color: "#e2e8f0" }
    }
  ), /* @__PURE__ */ React.createElement(Legend, { iconType: "circle", wrapperStyle: { fontSize: "10px", paddingTop: "20px" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "Principal", stackId: "a", fill: "#6366f1", radius: [0, 0, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "Interest", stackId: "a", fill: "#f43f5e", radius: [4, 4, 0, 0] })))))));
};
const LoanTrendGraph = ({ data }) => {
  const months = useMemo(() => Object.keys(data).filter(isMonthKey).sort(), [data]);
  const uniqueLoanNames = useMemo(() => {
    const names = /* @__PURE__ */ new Set();
    months.forEach((m) => {
      (data[m]?.loans || []).forEach((loan) => names.add(loan.name));
    });
    return Array.from(names);
  }, [data, months]);
  const graphData = useMemo(() => months.map((m) => {
    const point = { name: m };
    (data[m]?.loans || []).forEach((loan) => {
      point[loan.name] = Number(loan.amount) || 0;
    });
    return point;
  }), [data, months]);
  const colors = ["#f43f5e", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];
  return /* @__PURE__ */ React.createElement(GlassCard, { className: "p-6 h-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20" }, /* @__PURE__ */ React.createElement(Icons.TrendingDown, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-bold text-white font-grotesk" }, "Balance Trend by Loan")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider font-grotesk" }, "Loan Analytics")), /* @__PURE__ */ React.createElement("div", { className: "h-64 sm:h-72" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(LineChart, { data: graphData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255, 255, 255, 0.05)" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", fontSize: 10, stroke: "#94a3b8", tickMargin: 10, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 10, width: 60, stroke: "#94a3b8", tickFormatter: (val) => val >= 1e6 ? `${(val / 1e6).toFixed(1)}M` : val >= 1e3 ? `${(val / 1e3).toFixed(0)}k` : val, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(
    RechartsTooltip,
    {
      formatter: (val, name) => [formatCurrency(val), name],
      contentStyle: { background: "rgba(10, 11, 22, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", color: "#e2e8f0" }
    }
  ), /* @__PURE__ */ React.createElement(Legend, { iconType: "circle", wrapperStyle: { fontSize: "11px", paddingTop: "10px" } }), uniqueLoanNames.map((loanName, index) => /* @__PURE__ */ React.createElement(
    Line,
    {
      key: loanName,
      type: "monotone",
      dataKey: loanName,
      name: loanName,
      stroke: colors[index % colors.length],
      strokeWidth: 3,
      dot: { r: 3, strokeWidth: 2, fill: "#0f1026" },
      activeDot: { r: 6, strokeWidth: 0 }
    }
  ))))));
};
const LoanManagement = ({ data, onUpdate }) => {
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-6" }, /* @__PURE__ */ React.createElement(LoanTrendGraph, { data })), /* @__PURE__ */ React.createElement(GenericSpreadsheet, { data, type: "loans", onUpdate, hasCategory: false }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-6" }, /* @__PURE__ */ React.createElement(LoanCalculator, null)));
};
const migrateStockProfitData = (data) => {
  let migrated = false;
  const newData = JSON.parse(JSON.stringify(data));
  Object.keys(newData).forEach((month) => {
    if (isMonthKey(month) && newData[month].stockProfit) {
      const newStockProfit = [];
      newData[month].stockProfit.forEach((item) => {
        const hasValidCategory = item.category === "DIVIDEND" || item.category === "STOCK_PROFIT";
        if (!hasValidCategory) {
          const hasProfit = item.profit !== void 0 && item.profit !== null && String(item.profit).trim() !== "0" && String(item.profit).trim() !== "";
          const hasDividend = item.dividend !== void 0 && item.dividend !== null && String(item.dividend).trim() !== "0" && String(item.dividend).trim() !== "";
          if (hasProfit) {
            newStockProfit.push({
              id: item.id || Date.now() + Math.random(),
              name: item.name,
              category: "STOCK_PROFIT",
              category2: item.category2 || "",
              profit: item.profit,
              dividend: 0
            });
            migrated = true;
          }
          if (hasDividend) {
            newStockProfit.push({
              id: item.id ? `${item.id}_div` : Date.now() + Math.random() + 0.1,
              name: item.name,
              category: "DIVIDEND",
              category2: item.category2 || "",
              profit: 0,
              dividend: item.dividend
            });
            migrated = true;
          }
          if (!hasProfit && !hasDividend) {
            newStockProfit.push({
              id: item.id || Date.now() + Math.random(),
              name: item.name,
              category: "STOCK_PROFIT",
              category2: item.category2 || "",
              profit: 0,
              dividend: 0
            });
            migrated = true;
          }
        } else {
          newStockProfit.push(item);
        }
      });
      newData[month].stockProfit = newStockProfit;
    }
  });
  return { newData, migrated };
};
function App() {
  const [user, setUser] = useState(null);
  const [dashboardViewDate, setDashboardViewDate] = useState(() => {
    const saved = localStorage.getItem("financialData");
    const parsed = saved ? JSON.parse(saved) : {};
    const allM = Object.keys(parsed).filter((k) => /^\d{4}-\d{2}$/.test(k)).sort();
    const today = /* @__PURE__ */ new Date();
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
    return allM.includes(key) ? key : allM[allM.length - 1] || key;
  });
  const [syncId, setSyncId] = useState(() => localStorage.getItem("fm_sync_id") || generateUUID());
  const [financialData, setFinancialData] = useState(() => {
    const saved = localStorage.getItem("financialData");
    const parsed = saved ? JSON.parse(saved) : generateInitialData();
    if (!parsed.salary) parsed.salary = generateInitialData().salary;
    if (!parsed.meta) parsed.meta = {};
    if (!parsed.meta.goals) parsed.meta.goals = { loan: 30, invest: 30, netWorth: 1e9 };
    if (!parsed.meta.hiddenRows) parsed.meta.hiddenRows = {};
    return parsed;
  });
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const darkMode = true;
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  const updateFinancialData = (newData) => {
    setFinancialData(newData);
    setLastUpdated(Date.now());
  };
  useEffect(() => {
    const { newData, migrated } = migrateStockProfitData(financialData);
    if (migrated) {
      setFinancialData(newData);
      setLastUpdated(Date.now());
    }
  }, [financialData]);
  useEffect(() => {
    localStorage.setItem("financialData", JSON.stringify(financialData));
  }, [financialData]);
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) await auth.signInWithCustomToken(__initial_auth_token);
      else await auth.signInAnonymously();
    };
    initAuth();
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (!user || !db) return;
    localStorage.setItem("fm_sync_id", syncId);
    const docRef = db.doc(`artifacts/${appId}/public/data/financial_sheets/${syncId}`);
    const unsubscribe = docRef.onSnapshot((docSnap) => {
      if (docSnap.exists) {
        const cloudData = docSnap.data();
        setFinancialData((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(cloudData)) return cloudData;
          return prev;
        });
        setLastUpdated(Date.now());
      }
    });
    return () => unsubscribe();
  }, [user, syncId]);
  useEffect(() => {
    if (!user || !db) return;
    setIsSyncing(true);
    const timeoutId = setTimeout(async () => {
      try {
        await db.doc(`artifacts/${appId}/public/data/financial_sheets/${syncId}`).set(financialData);
        setIsSyncing(false);
      } catch (err) {
        console.error(err);
      }
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [financialData, user, syncId]);
  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      const initial = generateInitialData();
      setFinancialData(initial);
      localStorage.removeItem("financialData");
    }
  };
  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: Icons.LayoutDashboard },
    { id: "assets", label: "Asset Sheets", icon: Icons.Table2 },
    { id: "budget", label: "Income & Expenses", icon: Icons.Banknote },
    { id: "loans", label: "Loans & Debt", icon: Icons.CreditCard },
    { id: "realestate", label: "Real Estate", icon: Icons.Home },
    { id: "stocks", label: "Stock Profits", icon: Icons.CandlestickChart },
    { id: "salary", label: "Salary Sheets", icon: Icons.TrendingUp }
  ];
  const [activeTab, setActiveTab] = useState("dashboard");
  const dashboardAllMonths = Object.keys(financialData).filter(isMonthKey).sort();
  const handleDashboardMonthChange = (direction) => {
    const idx = dashboardAllMonths.indexOf(dashboardViewDate);
    if (idx === -1) {
      if (dashboardAllMonths.length > 0) setDashboardViewDate(dashboardAllMonths[dashboardAllMonths.length - 1]);
      return;
    }
    const newIdx = idx + direction;
    if (newIdx >= 0 && newIdx < dashboardAllMonths.length) setDashboardViewDate(dashboardAllMonths[newIdx]);
  };
  return /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement("div", { className: "h-screen font-sans overflow-hidden flex flex-col transition-all duration-300 quantum-bg relative" }, /* @__PURE__ */ React.createElement("div", { className: "blob blob-blue" }), /* @__PURE__ */ React.createElement("div", { className: "blob blob-purple" }), /* @__PURE__ */ React.createElement("div", { className: "blob blob-pink" }), /* @__PURE__ */ React.createElement(SyncModal, { isOpen: showSyncModal, onClose: () => setShowSyncModal(false), currentId: syncId, onSyncIdChange: setSyncId }), /* @__PURE__ */ React.createElement("div", { className: "sticky top-0 z-50 backdrop-blur-xl border-b shrink-0 transition-all duration-300 bg-black/30 border-white/5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center h-16 max-w-[1600px] mx-auto px-6 lg:px-10 relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 sm:gap-8 flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 p-0.5" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-full rounded-full bg-[#0a0b16] flex items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400" }, "V"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-md font-bold tracking-tight font-grotesk text-white leading-none" }, "QuantumVault"), /* @__PURE__ */ React.createElement("p", { className: "text-[8px] text-white/40 uppercase tracking-widest mt-0.5 leading-none" }, "Holographic Telemetry Console"))), activeTab === "dashboard" && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 shadow-sm shrink-0" }, /* @__PURE__ */ React.createElement("button", { onClick: () => handleDashboardMonthChange(-1), className: "p-0.5 rounded-full transition-colors text-slate-400 hover:bg-white/10" }, /* @__PURE__ */ React.createElement(Icons.ChevronLeft, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-extrabold min-w-[72px] text-center text-cyan-400 font-grotesk" }, dashboardViewDate), /* @__PURE__ */ React.createElement("button", { onClick: () => handleDashboardMonthChange(1), className: "p-0.5 rounded-full transition-colors text-slate-400 hover:bg-white/10" }, /* @__PURE__ */ React.createElement(Icons.ChevronRight, { className: "w-4 h-4" }))), /* @__PURE__ */ React.createElement("nav", { className: "hidden md:flex lg:hidden items-center gap-1.5 overflow-x-auto no-scrollbar" }, TABS.map((tab) => /* @__PURE__ */ React.createElement("button", { key: tab.id, onClick: () => setActiveTab(tab.id), className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"}` }, /* @__PURE__ */ React.createElement(tab.icon, { className: `w-4 h-4 ${activeTab === tab.id ? "text-cyan-400" : "text-slate-500"}` }), tab.label)))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 shrink-0 ml-4" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowSyncModal(true), className: "text-[10px] font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full px-3 py-1 flex items-center gap-1.5 transition-all hover:bg-cyan-500/20" }, /* @__PURE__ */ React.createElement("div", { className: `w-1.5 h-1.5 rounded-full ${isSyncing ? "bg-fuchsia-500 animate-pulse" : "bg-cyan-400"}` }), /* @__PURE__ */ React.createElement("span", null, "QUANTUM_LINK: ", isSyncing ? "SYNCING" : "ACTIVE")), /* @__PURE__ */ React.createElement("div", { className: "hidden sm:flex text-[10px] font-semibold bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 rounded-full px-3 py-1 items-center gap-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "w-1.5 h-1.5 rounded-full bg-fuchsia-400" }), /* @__PURE__ */ React.createElement("span", null, "DB_SYNCED")), /* @__PURE__ */ React.createElement("button", { onClick: handleResetData, className: "text-slate-500 hover:text-rose-500 transition-colors p-1.5 rounded-lg border border-white/5 hover:border-rose-500/30 hover:bg-rose-500/10", title: "Reset All Data" }, /* @__PURE__ */ React.createElement(Icons.RefreshCw, { className: "w-3.5 h-3.5" })))), /* @__PURE__ */ React.createElement("div", { className: "md:hidden overflow-x-auto no-scrollbar px-4 py-2 border-t flex gap-2 relative z-10 border-white/5 bg-[#0f1026]/40 backdrop-blur-xl" }, TABS.map((tab) => /* @__PURE__ */ React.createElement("button", { key: tab.id, onClick: () => setActiveTab(tab.id), className: `flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" : "text-slate-400 bg-white/5"}` }, tab.label)))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex overflow-hidden relative z-10" }, /* @__PURE__ */ React.createElement("aside", { className: "hidden lg:flex flex-col w-64 border-r border-white/5 bg-black/25 backdrop-blur-xl p-6 overflow-y-auto shrink-0 justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] font-grotesk pl-2" }, "Console Menu"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, TABS.map((tab) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: tab.id,
      onClick: () => setActiveTab(tab.id),
      className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"}`
    },
    /* @__PURE__ */ React.createElement(tab.icon, { className: `w-4 h-4 shrink-0 ${activeTab === tab.id ? "text-cyan-400" : "text-slate-500"}` }),
    /* @__PURE__ */ React.createElement("span", { className: "font-grotesk" }, tab.label)
  ))), /* @__PURE__ */ React.createElement(GlassCard, { className: "p-4 border-cyan-500/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider font-grotesk" }, "Quantum Status"), /* @__PURE__ */ React.createElement("span", { className: "text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded" }, "ONLINE")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs font-mono text-slate-300 mb-2" }, /* @__PURE__ */ React.createElement("span", null, "DB Latency"), /* @__PURE__ */ React.createElement("span", { className: "text-cyan-400" }, "14 ms")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 mt-auto border-t border-white/5 pt-6 font-mono text-[9px] text-slate-500" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "SYS_SHIELD:"), /* @__PURE__ */ React.createElement("span", { className: "text-cyan-400 font-bold" }, "SECURED")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "INTEGRITY:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 font-bold" }, "100% OK")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "FIREBASE:"), /* @__PURE__ */ React.createElement("span", { className: "text-pink-400 font-bold" }, "CONNECTED")))), /* @__PURE__ */ React.createElement("main", { className: "flex-1 overflow-auto p-4 lg:p-8 custom-scrollbar" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[1600px] mx-auto space-y-6 pb-20" }, activeTab === "dashboard" && /* @__PURE__ */ React.createElement(Dashboard, { key: lastUpdated, data: financialData, onUpdate: updateFinancialData, darkMode, viewDate: dashboardViewDate, setViewDate: setDashboardViewDate }), activeTab === "assets" && /* @__PURE__ */ React.createElement(GenericSpreadsheet, { data: financialData, type: "assets", onUpdate: updateFinancialData, categories: ASSET_CATEGORIES, hasCategory: true, darkMode }), activeTab === "realestate" && /* @__PURE__ */ React.createElement(RealEstateSheet, { data: financialData, onUpdate: updateFinancialData, darkMode }), activeTab === "budget" && /* @__PURE__ */ React.createElement(GenericSpreadsheet, { data: financialData, type: "budget", onUpdate: updateFinancialData, categories: BUDGET_CATEGORIES, hasCategory: true, darkMode }), activeTab === "loans" && /* @__PURE__ */ React.createElement(LoanManagement, { data: financialData, onUpdate: updateFinancialData, darkMode }), activeTab === "stocks" && /* @__PURE__ */ React.createElement(GenericSpreadsheet, { data: financialData, type: "stockProfit", onUpdate: updateFinancialData, categories: STOCK_PROFIT_CATEGORIES, hasCategory: true, darkMode }), activeTab === "salary" && /* @__PURE__ */ React.createElement(SalarySheet, { data: financialData, onUpdate: updateFinancialData, darkMode }))))));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ React.createElement(App, null));
