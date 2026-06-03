import { useState, useMemo } from "react";
import Head from "next/head";

interface PrintModule {
  id: string;
  name: string;
  hours: string;
  minutes: string;
  grams: string;
}

export default function PriceCalculator() {
  const [modules, setModules] = useState<PrintModule[]>([
    { id: "1", name: "Part 1", hours: "2", minutes: "30", grams: "120" }
  ]);

  const addModule = () => {
    setModules((prev) => {
      const maxId = prev.reduce((max, m) => {
        const numId = parseInt(m.id, 10);
        return isNaN(numId) ? max : Math.max(max, numId);
      }, 0);
      const nextId = (maxId + 1).toString();
      return [
        ...prev,
        {
          id: nextId,
          name: `Part ${nextId}`,
          hours: "0",
          minutes: "0",
          grams: "0",
        },
      ];
    });
  };

  const removeModule = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  const updateModule = (id: string, field: keyof PrintModule, value: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;

        let cleanedValue = value;
        if (field === "hours" || field === "minutes" || field === "grams") {
          const parsed = parseFloat(value);
          if (!isNaN(parsed) && parsed < 0) {
            cleanedValue = "0";
          }
        }

        return { ...m, [field]: cleanedValue };
      })
    );
  };

  const calculatedModules = useMemo(() => {
    return modules.map((m) => {
      const H = Math.max(0, parseFloat(m.hours) || 0);
      const M = Math.max(0, parseFloat(m.minutes) || 0);
      const F = Math.max(0, parseFloat(m.grams) || 0);

      const T = H + M / 60;
      const L = 650; // Labor rate constant

      // Cost equations
      const filamentCost = (F / 1000) * 750 * 1.75;
      const electricityCost = ((1300 / 1000) * T) * 14;
      const machineCost = (32000 / (8760 * 3)) * T;
      const laborCost = Math.max(T / 3, 1) * (L / 8);

      const subtotal = filamentCost + electricityCost + machineCost + laborCost;
      const total = subtotal * 1.5;

      return {
        ...m,
        filamentCost,
        electricityCost,
        machineCost,
        laborCost,
        subtotal,
        total,
      };
    });
  }, [modules]);

  const aggregates = useMemo(() => {
    let totalFilamentCost = 0;
    let totalElectricityCost = 0;
    let totalMachineCost = 0;
    let totalLaborCost = 0;
    let grandTotal = 0;
    let grandSubtotal = 0;

    calculatedModules.forEach((m) => {
      totalFilamentCost += m.filamentCost;
      totalElectricityCost += m.electricityCost;
      totalMachineCost += m.machineCost;
      totalLaborCost += m.laborCost;
      grandTotal += m.total;
      grandSubtotal += m.subtotal;
    });

    let filamentPercent = 0;
    let electricityPercent = 0;
    let machinePercent = 0;
    let laborPercent = 0;

    if (grandSubtotal > 0) {
      filamentPercent = (totalFilamentCost / grandSubtotal) * 100;
      electricityPercent = (totalElectricityCost / grandSubtotal) * 100;
      machinePercent = (totalMachineCost / grandSubtotal) * 100;
      laborPercent = (totalLaborCost / grandSubtotal) * 100;
    }

    return {
      grandTotal,
      filamentPercent,
      electricityPercent,
      machinePercent,
      laborPercent,
    };
  }, [calculatedModules]);

  return (
    <>
      <Head>
        <title>Price Calculator | LunarMake 3D Print</title>
        <meta
          name="description"
          content="Estimate your 3D printing project costs using our transparent pricing calculator. Adjust print times and materials."
        />
      </Head>

      <div className="flex-grow px-margin_mobile md:px-margin_desktop max-w-container_max_width mx-auto w-full py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-stack_lg mb-5">
            <h2 className="font-heading text-3xl text-primary mb-3">
              Precision Price Estimator
            </h2>
            <p className="text-on-surface-variant max-w-2xl font-sans text-body-lg">
              Calculate project costs with industrial accuracy. Our transparent algorithm factors in material consumption, power usage, machine wear, and expert labor.
            </p>
          </div>

          {/* Bento Layout for Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Input Section */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex justify-between items-center bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined text-2xl">
                    layers
                  </span>
                  <h3 className="font-heading text-title-md font-semibold">
                    Print Parts / Modules
                  </h3>
                </div>
                <button
                  onClick={addModule}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  Add Part
                </button>
              </div>

              {calculatedModules.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center gap-4">
                  <span className="material-symbols-outlined text-4xl text-outline-variant">
                    settings_input_component
                  </span>
                  <div>
                    <h4 className="font-heading text-lg font-semibold text-primary">No Parts Added</h4>
                    <p className="text-on-surface-variant text-sm mt-1">
                      Add at least one 3D printing module to begin estimating.
                    </p>
                  </div>
                  <button
                    onClick={addModule}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    <span className="material-symbols-outlined">add</span>
                    Add Your First Part
                  </button>
                </div>
              ) : (
                calculatedModules.map((m, index) => (
                  <div
                    key={m.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 ambient-shadow transition-all duration-300 hover:shadow-md flex flex-col gap-4"
                  >
                    {/* Card Header: Edit Name and Delete Button */}
                    <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                      <div className="flex items-center gap-2 flex-grow max-w-[60%]">
                        <span className="material-symbols-outlined text-primary text-xl">
                          precision_manufacturing
                        </span>
                        <input
                          type="text"
                          value={m.name}
                          onChange={(e) => updateModule(m.id, "name", e.target.value)}
                          className="font-heading font-semibold text-primary text-title-md bg-transparent border-b border-transparent hover:border-outline-variant/50 focus:border-primary focus:ring-0 px-1 py-0.5 rounded transition-all focus:outline-none w-full"
                          placeholder={`Part ${index + 1}`}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Local Price Display */}
                        <div className="text-right">
                          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-mono block">
                            Local Price
                          </span>
                          <span className="font-heading text-base font-bold text-primary">
                            ₱{m.total.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        {/* Delete Button */}
                        <button
                          onClick={() => removeModule(m.id)}
                          className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all cursor-pointer"
                          title="Remove part"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Body: Hours, Minutes, Grams */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Hours */}
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                          Hours
                        </label>
                        <div className="relative">
                          <input
                            className="w-full bg-surface border border-outline-variant rounded-lg p-3 pr-12 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-body-md"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={m.hours}
                            onChange={(e) => updateModule(m.id, "hours", e.target.value)}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant font-mono text-[10px] uppercase pointer-events-none">
                            HRS
                          </div>
                        </div>
                      </div>

                      {/* Minutes */}
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                          Minutes
                        </label>
                        <div className="relative">
                          <input
                            className="w-full bg-surface border border-outline-variant rounded-lg p-3 pr-12 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-body-md"
                            type="number"
                            min="0"
                            max="59"
                            placeholder="0"
                            value={m.minutes}
                            onChange={(e) => updateModule(m.id, "minutes", e.target.value)}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant font-mono text-[10px] uppercase pointer-events-none">
                            MIN
                          </div>
                        </div>
                      </div>

                      {/* Grams */}
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                          Weight
                        </label>
                        <div className="relative">
                          <input
                            className="w-full bg-surface border border-outline-variant rounded-lg p-3 pr-16 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-body-md"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={m.grams}
                            onChange={(e) => updateModule(m.id, "grams", e.target.value)}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant font-mono text-[10px] uppercase pointer-events-none">
                            GRAMS
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Price Display Section */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Total Card */}
              <div className="bg-primary text-on-primary rounded-xl p-5 ambient-shadow flex-grow flex flex-col justify-between transition-all duration-300 hover:shadow-md">
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="font-mono text-label-caps text-on-primary-container opacity-85 uppercase tracking-wider mb-2">
                        Quote Total
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-4xl opacity-85">₱</span>
                        <span className="font-heading text-4xl font-bold leading-none" id="total-price">
                          {aggregates.grandTotal.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-3xl text-on-primary-container opacity-60">
                      receipt_long
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown Card */}
              <div className="bg-surface-container-high border border-outline-variant rounded-xl p-5">
                <h4 className="font-heading text-title-md text-primary font-semibold mb-6">
                  Aggregate Cost Breakdown
                </h4>

                <div className="space-y-6">
                  {/* Factor 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-sans text-body-sm">
                      <div className="flex items-center gap-2 text-on-surface">
                        <span className="material-symbols-outlined text-xl text-on-surface-variant">
                          inventory_2
                        </span>
                        <span>Filament Cost</span>
                      </div>
                      <span className="font-mono text-xs text-on-surface-variant font-semibold">
                        {aggregates.filamentPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${aggregates.filamentPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Factor 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-sans text-body-sm">
                      <div className="flex items-center gap-2 text-on-surface">
                        <span className="material-symbols-outlined text-xl text-on-surface-variant">
                          bolt
                        </span>
                        <span>Electricity Cost</span>
                      </div>
                      <span className="font-mono text-xs text-on-surface-variant font-semibold">
                        {aggregates.electricityPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${aggregates.electricityPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Factor 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-sans text-body-sm">
                      <div className="flex items-center gap-2 text-on-surface">
                        <span className="material-symbols-outlined text-xl text-on-surface-variant">
                          precision_manufacturing
                        </span>
                        <span>Machine Wear</span>
                      </div>
                      <span className="font-mono text-xs text-on-surface-variant font-semibold">
                        {aggregates.machinePercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${aggregates.machinePercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Factor 4 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-sans text-body-sm">
                      <div className="flex items-center gap-2 text-on-surface">
                        <span className="material-symbols-outlined text-xl text-on-surface-variant">
                          engineering
                        </span>
                        <span>Labor</span>
                      </div>
                      <span className="font-mono text-xs text-on-surface-variant font-semibold">
                        {aggregates.laborPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${aggregates.laborPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
