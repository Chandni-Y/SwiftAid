(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthorityMapInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/react-leaflet/lib/Popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Polyline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/react-leaflet/lib/Polyline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/swiftaid (1)/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Fix Leaflet marker icons
delete __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Icon.Default.prototype._getIconUrl;
__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Icon.Default.mergeOptions({
    iconRetinaUrl: __turbopack_context__.r("[project]/Downloads/swiftaid (1)/node_modules/leaflet/dist/images/marker-icon-2x.png (static in ecmascript)").default?.src || 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: __turbopack_context__.r("[project]/Downloads/swiftaid (1)/node_modules/leaflet/dist/images/marker-icon.png (static in ecmascript)").default?.src || 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: __turbopack_context__.r("[project]/Downloads/swiftaid (1)/node_modules/leaflet/dist/images/marker-shadow.png (static in ecmascript)").default?.src || 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});
// Create custom icons for different incident types
const createCustomIcon = (color)=>{
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DivIcon({
        className: 'custom-icon',
        html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      "></div>
    `,
        iconSize: [
            30,
            30
        ],
        iconAnchor: [
            15,
            30
        ],
        popupAnchor: [
            0,
            -30
        ]
    });
};
const medicalIcon = createCustomIcon('#ef4444'); // red-500
const fireIcon = createCustomIcon('#f59e0b'); // amber-500
const crimeIcon = createCustomIcon('#3b82f6'); // blue-500
// Component to dynamically fit bounds when selected incident changes
function FitBounds({ incident, station }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FitBounds.useEffect": ()=>{
            if (incident) {
                const bounds = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].latLngBounds([
                    station.lat,
                    station.lng
                ], [
                    incident.lat,
                    incident.lng
                ]);
                // Pad bounds to ensure both markers are well within view
                map.flyToBounds(bounds, {
                    padding: [
                        50,
                        50
                    ],
                    duration: 1.5
                });
            }
        }
    }["FitBounds.useEffect"], [
        incident,
        station,
        map
    ]);
    return null;
}
_s(FitBounds, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = FitBounds;
function AuthorityMapInterface({ incidents, onMarkerClick, selectedIncident }) {
    // Default authority jurisdiction center (e.g., city center)
    const defaultCenter = {
        lat: 20.5937,
        lng: 78.9629
    };
    // Simulated emergency station location 
    const emergencyStation = {
        lat: 20.6000,
        lng: 78.9500
    };
    const getIconForType = (type)=>{
        switch(type){
            case 'medical':
                return medicalIcon;
            case 'fire':
                return fireIcon;
            case 'crime':
                return crimeIcon;
            default:
                return medicalIcon;
        }
    };
    const getLabelForType = (type)=>{
        switch(type){
            case 'medical':
                return 'Medical Emergency';
            case 'fire':
                return 'Fire Emergency';
            case 'crime':
                return 'Security / Crime';
            default:
                return 'Emergency';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full z-0 relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
            center: [
                defaultCenter.lat,
                defaultCenter.lng
            ],
            zoom: 13,
            style: {
                height: '100%',
                width: '100%',
                zIndex: 0
            },
            zoomControl: false,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }, void 0, false, {
                    fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                selectedIncident && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Polyline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Polyline"], {
                            positions: [
                                [
                                    emergencyStation.lat,
                                    emergencyStation.lng
                                ],
                                [
                                    selectedIncident.lat,
                                    selectedIncident.lng
                                ]
                            ],
                            color: "#3b82f6",
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "10, 10",
                            className: "animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FitBounds, {
                            incident: selectedIncident,
                            station: emergencyStation
                        }, void 0, false, {
                            fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: [
                        emergencyStation.lat,
                        emergencyStation.lng
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-bold",
                                children: "Emergency Operations Center"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-500",
                                children: "Dispatch Base"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this),
                incidents.map((incident)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                        position: [
                            incident.lat,
                            incident.lng
                        ],
                        icon: getIconForType(incident.type),
                        eventHandlers: {
                            click: ()=>onMarkerClick(incident)
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                            className: "incident-popup min-w-[250px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-bold text-base mb-1 text-slate-900 border-b pb-2",
                                        children: getLabelForType(incident.type)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-slate-700",
                                                        children: "Time:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 21
                                                    }, this),
                                                    " ",
                                                    incident.timeReported
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                lineNumber: 159,
                                                columnNumber: 19
                                            }, this),
                                            incident.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-slate-700",
                                                        children: "Details:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-slate-600 bg-slate-50 p-2 rounded-md",
                                                        children: incident.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                lineNumber: 163,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-400 font-mono mt-1",
                                                children: [
                                                    incident.lat.toFixed(6),
                                                    ", ",
                                                    incident.lng.toFixed(6)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                lineNumber: 168,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded shadow flex items-center justify-center gap-2 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Dispatch Ambulance"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded shadow flex items-center justify-center gap-2 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Dispatch Fire Unit"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                lineNumber: 177,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded shadow flex items-center justify-center gap-2 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$swiftaid__$28$1$292f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Notify Police"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                                lineNumber: 180,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this)
                    }, incident.id, false, {
                        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_c1 = AuthorityMapInterface;
var _c, _c1;
__turbopack_context__.k.register(_c, "FitBounds");
__turbopack_context__.k.register(_c1, "AuthorityMapInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/swiftaid (1)/src/components/AuthorityMapInterface.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Downloads_swiftaid%20%281%29_src_components_AuthorityMapInterface_tsx_70dc4d73._.js.map