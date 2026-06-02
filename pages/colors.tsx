import { useState, useMemo } from "react";
import Head from "next/head";
import colorsData from "@/public/colors.json";

interface ColorItem {
  id: string;
  material: string;
  name: string;
  hex: string;
  isSilk?: boolean;
  finish: string;
  description: string;
}

export default function ColorsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Material property metadata for the guide section
  const materialInfo = {
    PLA: {
      name: "PLA (Polylactic Acid)",
      description: "Easy to print, highly detailed, and derived from organic sources. Best for visual models, prototyping, and toys.",
      temp: "190°C - 220°C",
      bedTemp: "50°C - 60°C",
      strength: "Moderate",
      flexibility: "Low / Rigid",
      heatResistance: "Low (up to 55°C)",
      finish: "Glossy to Satin",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
      badgeClass: "bg-teal-500",
    },
    PETG: {
      name: "PETG (Polyethylene Terephthalate Glycol)",
      description: "Combines the ease of PLA with the durability of ABS. Highly impact and chemical resistant, ideal for functional outdoor parts.",
      temp: "230°C - 250°C",
      bedTemp: "70°C - 80°C",
      strength: "High",
      flexibility: "Moderate",
      heatResistance: "Moderate (up to 75°C)",
      finish: "High Gloss",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      badgeClass: "bg-indigo-500",
    },
    ABS: {
      name: "ABS (Acrylonitrile Butadiene Styrene)",
      description: "An industrial-grade plastic known for its extreme toughness and high heat resistance. Can be chemically smoothed with acetone.",
      temp: "240°C - 260°C",
      bedTemp: "90°C - 110°C",
      strength: "High",
      flexibility: "Moderate-High",
      heatResistance: "High (up to 100°C)",
      finish: "Matte to Satin",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      badgeClass: "bg-rose-500",
    },
  };

  // Filter and search logic
  const filteredColors = useMemo(() => {
    return (colorsData as ColorItem[]).filter((color) => {
      const matchesMaterial = selectedMaterial === "All" || color.material === selectedMaterial;
      const matchesSearch = color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            color.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            color.finish.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMaterial && matchesSearch;
    });
  }, [selectedMaterial, searchQuery]);

  return (
    <>
      <Head>
        <title>Available Filament Colors | LunarMake 3D Print</title>
        <meta
          name="description"
          content="Explore our wide range of available colors in PLA, PETG, and ABS plastic filaments. Browse swatches, textures, and material guidelines."
        />
      </Head>

      <div className="flex-grow px-margin_mobile md:px-margin_desktop max-w-container_max_width mx-auto w-full py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-heading text-4xl text-primary mb-3 font-semibold">
              Available Materials & Colors
            </h1>
            <p className="text-on-surface-variant max-w-2xl font-sans text-body-lg">
              Explore our current stock of printing filaments. Select different plastics to see their available colors, textures, and physical properties.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10 bg-surface-container-lowest border border-outline-variant p-4 rounded-2xl shadow-sm">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {["All", "PLA", "PETG", "ABS"].map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-5 py-2.5 rounded-xl font-heading text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                    selectedMaterial === mat
                      ? "bg-primary text-on-primary border-primary shadow-sm"
                      : "bg-surface border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary"
                  }`}
                >
                  {mat === "All" ? "All Materials" : mat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Search color or finish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-body-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left Sidebar: Selected Material Specs (Show if not 'All') */}
            <div className="lg:col-span-1 space-y-6">
              {selectedMaterial !== "All" ? (
                <div className="bg-surface-container border border-outline-variant rounded-2xl p-5 sticky top-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-3 h-3 rounded-full ${materialInfo[selectedMaterial as keyof typeof materialInfo].badgeClass}`}></span>
                    <h3 className="font-heading text-xl font-bold text-primary">
                      {selectedMaterial} Specifications
                    </h3>
                  </div>
                  <p className="text-on-surface-variant text-sm font-sans mb-5 leading-relaxed">
                    {materialInfo[selectedMaterial as keyof typeof materialInfo].description}
                  </p>
                  
                  <div className="space-y-3.5 border-t border-outline-variant/50 pt-4 font-sans text-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Strength:</span>
                      <span className="font-semibold text-primary">{materialInfo[selectedMaterial as keyof typeof materialInfo].strength}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Flexibility:</span>
                      <span className="font-semibold text-primary">{materialInfo[selectedMaterial as keyof typeof materialInfo].flexibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Heat Resistance:</span>
                      <span className="font-semibold text-primary">{materialInfo[selectedMaterial as keyof typeof materialInfo].heatResistance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Printing Temp:</span>
                      <span className="font-mono text-xs bg-surface-container-high px-2 py-0.5 rounded text-on-surface">{materialInfo[selectedMaterial as keyof typeof materialInfo].temp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Bed Temp:</span>
                      <span className="font-mono text-xs bg-surface-container-high px-2 py-0.5 rounded text-on-surface">{materialInfo[selectedMaterial as keyof typeof materialInfo].bedTemp}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container border border-outline-variant rounded-2xl p-5 sticky top-24">
                  <h3 className="font-heading text-lg font-bold text-primary mb-3">
                    Quick Selection Guide
                  </h3>
                  <p className="text-on-surface-variant text-sm font-sans mb-4 leading-relaxed">
                    Select a specific material tab above to view its detailed mechanical properties and print settings.
                  </p>
                  <div className="space-y-3 text-xs font-sans">
                    <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl">
                      <span className="font-bold text-teal-800">PLA:</span> Best for visual detail and models.
                    </div>
                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                      <span className="font-bold text-indigo-800">PETG:</span> Best for tough, functional parts.
                    </div>
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
                      <span className="font-bold text-rose-800">ABS:</span> Best for high heat and impact resistance.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Color Grid */}
            <div className="lg:col-span-3">
              {filteredColors.length === 0 ? (
                <div className="text-center py-20 bg-surface-container-lowest border border-outline-variant rounded-2xl">
                  <span className="material-symbols-outlined text-5xl text-outline mb-4">
                    color_lens
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-primary mb-2">No matching colors found</h3>
                  <p className="text-on-surface-variant font-sans">Try modifying your search or filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredColors.map((color) => {
                    const matInfo = materialInfo[color.material as keyof typeof materialInfo];
                    return (
                      <div
                        key={color.id}
                        className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
                      >
                        {/* Realistic 3D Swatch Box */}
                        <div className="relative h-40 w-full overflow-hidden flex items-center justify-center p-6 bg-surface-container-low border-b border-outline-variant/40">
                          {/* Inner container with realistic 3D appearance */}
                          <div
                            style={{
                              backgroundColor: color.hex,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), inset 0 2px 4px 0 rgba(255, 255, 255, 0.15), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.2)"
                            }}
                            className={`w-24 h-24 rounded-2xl relative transition-transform duration-500 group-hover:scale-108 flex items-center justify-center`}
                          >
                            {/* Texture Overlay: Simulating 3D printing layers */}
                            <div className="absolute inset-0 rounded-2xl opacity-20 mix-blend-overlay print-layers pointer-events-none" 
                                 style={{
                                   backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 4px)"
                                 }}
                            />

                            {/* Silk sheen effect */}
                            {color.isSilk && (
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/40 to-white/0 mix-blend-overlay opacity-80 pointer-events-none animate-pulse duration-3000" />
                            )}
                            
                            {/* Matte finish shadow overlay */}
                            {color.finish.toLowerCase().includes("matte") && (
                              <div className="absolute inset-0 rounded-2xl bg-black/10 mix-blend-overlay opacity-30 pointer-events-none" />
                            )}

                            {/* Reflection Glossy Highlight */}
                            <div className="absolute top-1 left-2 right-2 h-1/3 bg-gradient-to-b from-white/20 to-white/0 rounded-t-xl pointer-events-none" />

                            {/* Material Embossed Mark */}
                            <span className="font-mono text-[9px] font-black text-white/50 tracking-widest pointer-events-none uppercase">
                              {color.material}
                            </span>
                          </div>
                        </div>

                        {/* Color Info Card details */}
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${matInfo.badgeColor}`}>
                              {color.material}
                            </span>
                            <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                              {color.finish}
                            </span>
                          </div>
                          
                          <h4 className="font-heading text-lg font-bold text-primary mb-1">
                            {color.name}
                          </h4>
                          
                          <p className="text-xs text-on-surface-variant font-sans leading-relaxed flex-grow">
                            {color.description}
                          </p>

                          <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                            <span>HEX:</span>
                            <span className="font-bold select-all bg-surface-container px-1.5 py-0.5 rounded text-[10px]">
                              {color.hex}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
