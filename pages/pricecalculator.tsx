import { useState, useMemo } from "react";
import Head from "next/head";

export default function PriceCalculator() {
  const [hours, setHours] = useState<string>("2");
  const [minutes, setMinutes] = useState<string>("30");
  const [grams, setGrams] = useState<string>("120");

  const calculations = useMemo(() => {
    const H = parseFloat(hours) || 0;
    const M = parseFloat(minutes) || 0;
    const F = parseFloat(grams) || 0;

    const T = H + M / 60;
    const L = 650; // Labor rate constant

    // Cost equations
    const filamentCost = (F / 1000) * 750 * 1.75;
    const electricityCost = ((1300 / 1000) * T) * 14;
    const machineCost = (32000 / (8760 * 3)) * T;
    const laborCost = Math.max(T / 3, 1) * (L / 8);

    const subtotal = filamentCost + electricityCost + machineCost + laborCost;
    const total = subtotal * 1.5;

    // Proportional breakdown percentages
    let filamentPercent = 0;
    let electricityPercent = 0;
    let machinePercent = 0;
    let laborPercent = 0;

    if (subtotal > 0) {
      filamentPercent = (filamentCost / subtotal) * 100;
      electricityPercent = (electricityCost / subtotal) * 100;
      machinePercent = (machineCost / subtotal) * 100;
      laborPercent = (laborCost / subtotal) * 100;
    }

    return {
      total,
      filamentPercent,
      electricityPercent,
      machinePercent,
      laborPercent,
    };
  }, [hours, minutes, grams]);

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
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 ambient-shadow transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-5 mb-5 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  settings_input_component
                </span>
                <h3 className="font-heading text-title-md font-semibold">
                  Print Specifications
                </h3>
              </div>

              <div className="space-y-5">
                {/* Print Time */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-5">
                    <label className="font-mono text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Time (Hours)
                    </label>
                    <div className="relative group">
                      <input
                        className="w-full bg-surface border border-outline-variant rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-body-lg"
                        id="hours"
                        min="0"
                        placeholder="0"
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-outline font-mono text-label-caps pointer-events-none">
                        HRS
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <label className="font-mono text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Time (Minutes)
                    </label>
                    <div className="relative group">
                      <input
                        className="w-full bg-surface border border-outline-variant rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-body-lg"
                        id="minutes"
                        max="59"
                        min="0"
                        placeholder="0"
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-outline font-mono text-label-caps pointer-events-none">
                        MIN
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filament Weight */}
                <div className="space-y-stack_sm">
                  <label className="font-mono text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Filament Weight
                  </label>
                  <div className="relative group">
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-sans text-body-lg"
                      id="grams"
                      min="0"
                      placeholder="0.00"
                      type="number"
                      value={grams}
                      onChange={(e) => setGrams(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-outline font-mono text-label-caps pointer-events-none">
                      GRAMS
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Price Display Section */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Total Card */}
              <div className="bg-primary text-on-primary rounded-xl p-stack_lg ambient-shadow flex-grow flex flex-col justify-between transition-all duration-300 hover:shadow-md p-5">
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="font-mono text-label-caps text-on-primary-container opacity-85 uppercase tracking-wider mb-2">
                        Quote
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-4xl opacity-85">₱</span>
                        <span className="font-heading text-4xl font-bold leading-none" id="total-price">
                          {calculations.total.toLocaleString("en-US", {
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
                  Cost Breakdown Factors
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
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${calculations.filamentPercent}%` }}
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
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${calculations.electricityPercent}%` }}
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
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${calculations.machinePercent}%` }}
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
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${calculations.laborPercent}%` }}
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
