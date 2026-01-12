/**
 * GetAQuote Component (Portfolio 3D)
 *
 * Interactive quote request section with budget calculator.
 * Features a dialog-based form for collecting project requirements and estimating costs.
 *
 * @module components/portfolio3d/GetAQuote
 * @since 1.0.1
 *
 * Features:
 * - Project details input (floors, area)
 * - Service selection with conditional inputs (external/internal images, humanized plans)
 * - Animation options with type and duration selection
 * - Virtual tour options (complete/partial)
 * - Real-time budget estimation
 * - File upload for references
 * - Contact form integration
 *
 * Layout:
 * - CTA section with dialog trigger
 * - Two-column dialog layout (questions left, summary/contact right)
 * - Custom animated close button with hamburger-to-X transition
 * - Sticky right column for budget and contact info
 *
 * Animation:
 * - Button animations on selection (scale in/out with AnimatePresence)
 * - Conditional field reveal with smooth height transitions
 * - Framer Motion for all interactive elements
 *
 * @example
 * ```tsx
 * <GetAQuote />
 * ```
 */
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

/**
 * Selection state interface for the quote form
 * Manages all user selections and inputs across different service categories
 */
interface SelectionState {
  /** Project basic details */
  projectDetails: { floors: string; area: string };
  /** External images selection */
  external: { value: boolean | null; count: string };
  /** Internal images selection */
  internal: { value: boolean | null; count: string };
  /** Humanized floor plans selection */
  humanized: { value: boolean | null; count: string };
  /** Animation selection with type and duration */
  animation: { value: boolean | null; type: string | null; count: string; duration: string };
  /** Virtual tour selection with type and room count */
  tour: { value: boolean | null; type: string | null; rooms: string };
}

/**
 * Renders the quote request section with CTA and interactive dialog
 *
 * @returns Quote section JSX element
 */
export function GetAQuote() {
  const [selections, setSelections] = useState<SelectionState>({
    projectDetails: { floors: '', area: '' },
    external: { value: null, count: '' },
    internal: { value: null, count: '' },
    humanized: { value: null, count: '' },
    animation: { value: null, type: null, count: '', duration: '' },
    tour: { value: null, type: null, rooms: '' }
  });

  /**
   * Handles boolean selection toggle (Yes/No buttons)
   * Clicking the same value again deselects it
   *
   * @param key - The selection category key
   * @param value - The boolean value to set
   */
  const handleSelection = (key: keyof SelectionState, value: boolean) => {
    setSelections(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: prev[key].value === value ? null : value
      }
    }));
  };

  /**
   * Updates a specific field within a selection category
   *
   * @param key - The selection category key
   * @param field - The field name within the category
   * @param value - The new value to set
   */
  const updateField = (key: keyof SelectionState, field: string, value: any) => {
      setSelections(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  /**
   * Calculates the total estimated budget based on user selections
   * Pricing logic:
   * - External images: 1500 per image
   * - Internal images: 1200 per image
   * - Humanized plans: 800 per plan
   * - Animation: 3000 base + 100 per second
   * - Virtual tour: 5000 complete, or 2000 + 500 per room for partial
   *
   * @returns Total estimated price
   */
  const calculateTotal = () => {
    let total = 0;
    if (selections.external.value) total += (parseInt(selections.external.count) || 0) * 1500;
    if (selections.internal.value) total += (parseInt(selections.internal.count) || 0) * 1200;
    if (selections.humanized.value) total += (parseInt(selections.humanized.count) || 0) * 800;
    if (selections.animation.value) {
      const count = parseInt(selections.animation.count) || 0;
      const seconds = parseInt(selections.animation.duration.replace(/\D/g, '')) || 0;
      total += count * (3000 + seconds * 100);
    }
    if (selections.tour.value) {
      if (selections.tour.type === 'Completo') total += 5000;
      else total += 2000 + (parseInt(selections.tour.rooms) || 0) * 500;
    }
    return total;
  };

  return (
    <section className="bg-[var(--color-background)] text-[var(--color-text-dark)] px-6 md:px-12 lg:px-16 xl:px-20 pb-6 md:pb-8 lg:pb-12 xl:pb-16 overflow-hidden">
      <div className="mx-auto relative w-full">
        {/* Call to Action */}
        <motion.div
          className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl lg:text-2xl font-light text-[var(--color-text-dark)] leading-relaxed">
            Vamos dar forma à sua ideia? <br />
            Faça um orçamento prévio e entre em contato, responderemos assim que possível!
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="group relative mx-2 my-2 inline-block text-sm uppercase tracking-wider text-[var(--color-text-dark)] no-underline bg-transparent border-none cursor-pointer"
              >
                <span className="absolute inset-0 bg-[var(--color-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10 block px-6 py-3 transition-colors duration-300 text-[var(--color-text-dark)] group-hover:text-[var(--color-background)] uppercase text-xs flex items-center gap-2">
                  <h6>SIMULAR ORÇAMENTO</h6>
                </span>
                <span className="absolute left-[-8px] right-[-8px] top-0 h-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
                <span className="absolute left-[-8px] right-[-8px] bottom-0 h-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
                <span className="absolute bottom-[-8px] top-[-8px] left-0 w-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
                <span className="absolute bottom-[-8px] top-[-8px] right-0 w-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] bg-[var(--color-background)] text-[var(--color-text-dark)] border-[var(--color-text-dark)] max-h-[90vh] !rounded-xl overflow-hidden p-0 flex flex-col [&>button:last-child]:hidden">
              <DialogClose className="absolute top-8 right-8 z-50 backdrop-blur-sm rounded-xl w-10 h-10 md:w-12 md:h-12 transition-all duration-300 bg-[var(--color-primary)]/90 hover:bg-[var(--color-primary)] flex items-center justify-center border-none outline-none cursor-pointer">
                  <div className="relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mx-auto pointer-events-none">
                    <motion.div
                      className="absolute inset-0 flex flex-col justify-center gap-[5px]"
                    >
                      <motion.div
                        className="w-full h-[1.5px] rounded-full bg-white"
                        animate={{
                          rotate: 45,
                          y: 6.5
                        }}
                      />
                      <motion.div
                        className="w-full h-[1.5px] rounded-full bg-white"
                        animate={{
                          opacity: 0
                        }}
                      />
                      <motion.div
                        className="w-full h-[1.5px] rounded-full bg-white"
                        animate={{
                          opacity: 0
                        }}
                      />
                      <motion.div
                        className="w-full h-[1.5px] rounded-full bg-white"
                        animate={{
                          rotate: -45,
                          y: -6.5
                        }}
                      />
                    </motion.div>
                  </div>
              </DialogClose>
              <div className="w-full h-full overflow-y-auto p-6 sm:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--color-primary)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[var(--color-accent)]">
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-wide">Orçamento</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 pt-4">
                {/* Left Column - Questions */}
                <div className="space-y-6">
                  {/* Project Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Quantidade de pavimentos</Label>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Ex: 2"
                        className="w-full border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                        value={selections.projectDetails.floors}
                        onChange={(e) => updateField('projectDetails', 'floors', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">m² por pavimentos</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Ex: 150"
                        className="w-full border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                        value={selections.projectDetails.area}
                        onChange={(e) => updateField('projectDetails', 'area', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* External Images */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Imagens Externas?</Label>
                    <div className="flex items-center gap-4 min-h-[40px]">
                      <AnimatePresence mode="popLayout">
                        {(selections.external.value === null || selections.external.value === true) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              variant={selections.external.value === true ? "default" : "outline"}
                              onClick={() => handleSelection('external', true)}
                              className={`border-[var(--color-text-dark)] ${selections.external.value === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Sim
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="popLayout">
                        {(selections.external.value === null || selections.external.value === false) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              variant={selections.external.value === false ? "default" : "outline"}
                              onClick={() => handleSelection('external', false)}
                              className={`border-[var(--color-text-dark)] ${selections.external.value === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Não
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {selections.external.value === true && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                          >
                            <Label className="text-sm whitespace-nowrap">Quantas?</Label>
                            <Input
                              className="w-20 h-9 border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                              value={selections.external.count}
                              onChange={(e) => updateField('external', 'count', e.target.value)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Internal Images */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Imagens Internas?</Label>
                    <div className="flex items-center gap-4 min-h-[40px]">
                      <AnimatePresence mode="popLayout">
                        {(selections.internal.value === null || selections.internal.value === true) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              variant={selections.internal.value === true ? "default" : "outline"}
                              onClick={() => handleSelection('internal', true)}
                              className={`border-[var(--color-text-dark)] ${selections.internal.value === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Sim
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="popLayout">
                        {(selections.internal.value === null || selections.internal.value === false) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              variant={selections.internal.value === false ? "default" : "outline"}
                              onClick={() => handleSelection('internal', false)}
                              className={`border-[var(--color-text-dark)] ${selections.internal.value === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Não
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {selections.internal.value === true && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                          >
                            <Label className="text-sm whitespace-nowrap">Quantas?</Label>
                            <Input
                              className="w-20 h-9 border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                              value={selections.internal.count}
                              onChange={(e) => updateField('internal', 'count', e.target.value)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Humanized Plans */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Plantas Humanizadas?</Label>
                    <div className="flex items-center gap-4 min-h-[40px]">
                      <AnimatePresence mode="popLayout">
                        {(selections.humanized.value === null || selections.humanized.value === true) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              variant={selections.humanized.value === true ? "default" : "outline"}
                              onClick={() => handleSelection('humanized', true)}
                              className={`border-[var(--color-text-dark)] ${selections.humanized.value === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Sim
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="popLayout">
                        {(selections.humanized.value === null || selections.humanized.value === false) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              variant={selections.humanized.value === false ? "default" : "outline"}
                              onClick={() => handleSelection('humanized', false)}
                              className={`border-[var(--color-text-dark)] ${selections.humanized.value === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Não
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {selections.humanized.value === true && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                          >
                            <Label className="text-sm whitespace-nowrap">Quantas?</Label>
                            <Input
                              className="w-20 h-9 border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                              value={selections.humanized.count}
                              onChange={(e) => updateField('humanized', 'count', e.target.value)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Animation */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Animação?</Label>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 min-h-[40px]">
                        <AnimatePresence mode="popLayout">
                          {(selections.animation.value === null || selections.animation.value === true) && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                              <Button
                                variant={selections.animation.value === true ? "default" : "outline"}
                                onClick={() => handleSelection('animation', true)}
                                className={`border-[var(--color-text-dark)] ${selections.animation.value === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                              >
                                Sim
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence mode="popLayout">
                          {(selections.animation.value === null || selections.animation.value === false) && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                              <Button
                                variant={selections.animation.value === false ? "default" : "outline"}
                                onClick={() => handleSelection('animation', false)}
                                className={`border-[var(--color-text-dark)] ${selections.animation.value === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                              >
                                Não
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {selections.animation.value === true && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 pl-4 border-l border-[var(--color-primary)]/30 py-1">
                              <div className="flex flex-wrap gap-2 min-h-[32px]">
                                <AnimatePresence mode="popLayout">
                                  {['Externa', 'Interna', 'Ambos'].map(type => {
                                    const isSelected = selections.animation.type === type;
                                    const isHidden = selections.animation.type !== null && !isSelected;

                                    if (isHidden) return null;

                                    return (
                                      <motion.div
                                        key={type}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        layout
                                      >
                                        <Button
                                          size="sm"
                                          variant={isSelected ? "default" : "outline"}
                                          onClick={() => updateField('animation', 'type', isSelected ? null : type)}
                                          className={`text-xs border-[var(--color-text-dark)]/50 ${isSelected ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                                        >
                                          {type}
                                        </Button>
                                      </motion.div>
                                    );
                                  })}
                                </AnimatePresence>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Quantas?</Label>
                                  <Input
                                    className="w-16 h-8 border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                                    value={selections.animation.count}
                                    onChange={(e) => updateField('animation', 'count', e.target.value)}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Tempo?</Label>
                                  <Input
                                    className="w-24 h-8 border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                                    placeholder="Ex: 30s"
                                    value={selections.animation.duration}
                                    onChange={(e) => updateField('animation', 'duration', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Virtual Tour */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Tour Virtual?</Label>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 min-h-[40px]">
                        <AnimatePresence mode="popLayout">
                          {(selections.tour.value === null || selections.tour.value === true) && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                              <Button
                                variant={selections.tour.value === true ? "default" : "outline"}
                                onClick={() => handleSelection('tour', true)}
                                className={`border-[var(--color-text-dark)] ${selections.tour.value === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                              >
                                Sim
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence mode="popLayout">
                          {(selections.tour.value === null || selections.tour.value === false) && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                              <Button
                                variant={selections.tour.value === false ? "default" : "outline"}
                                onClick={() => handleSelection('tour', false)}
                                className={`border-[var(--color-text-dark)] ${selections.tour.value === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                              >
                                Não
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {selections.tour.value === true && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 pl-4 border-l border-[var(--color-primary)]/30 py-1">
                              <div className="flex flex-wrap gap-2 min-h-[32px]">
                                <AnimatePresence mode="popLayout">
                                  {['Completo', 'Parcial'].map(type => {
                                    const isSelected = selections.tour.type === type;
                                    const isHidden = selections.tour.type !== null && !isSelected;

                                    if (isHidden) return null;

                                    return (
                                      <motion.div
                                        key={type}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        layout
                                      >
                                        <Button
                                          size="sm"
                                          variant={isSelected ? "default" : "outline"}
                                          onClick={() => updateField('tour', 'type', isSelected ? null : type)}
                                          className={`text-xs border-[var(--color-text-dark)]/50 ${isSelected ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                                        >
                                          {type}
                                        </Button>
                                      </motion.div>
                                    );
                                  })}
                                </AnimatePresence>
                              </div>

                              {selections.tour.type === 'Parcial' && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="flex items-center gap-2"
                                >
                                  <Label className="text-sm whitespace-nowrap">Quantos ambientes?</Label>
                                  <Input
                                    className="w-20 h-8 border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                                    value={selections.tour.rooms}
                                    onChange={(e) => updateField('tour', 'rooms', e.target.value)}
                                  />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 sticky top-4 self-start">
                  <div className="bg-[var(--color-primary)]/5 p-4 rounded-sm border border-[var(--color-primary)]/20">
                    <Label className="uppercase text-xs tracking-wider opacity-70 mb-1 block text-sm">Orçamento Estimado</Label>
                    <div className="text-3xl md:text-4xl font-light text-[var(--color-primary)]">
                      R$ {calculateTotal().toLocaleString('pt-BR')}
                    </div>
                    <p className="text-xs opacity-50 mt-1 uppercase tracking-wider">*Valor aproximado</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Alguma referência?</Label>
                    <div className="border-2 border-dashed border-[var(--color-text-dark)]/30 rounded-lg p-3 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer group">
                      <div className="mb-1 text-[var(--color-primary)] opacity-50 group-hover:opacity-100 transition-opacity">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                      </div>
                      <p className="text-xs opacity-70">Arraste os arquivos aqui ou</p>
                      <Button variant="outline" size="sm" className="mt-1 h-7 text-xs border-[var(--color-text-dark)] hover:bg-[var(--color-text-dark)] hover:text-[var(--color-background)]">
                        Selecione os arquivos
                      </Button>
                      <p className="text-[10px] opacity-50 mt-1">Tamanho max. dos arquivos: 512 MB</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Como podemos entrar em contato?</Label>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm">Nome <span className="text-red-500">*</span></Label>
                        <Input id="name" placeholder="João da Silva*" className="border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm">Email <span className="text-red-500">*</span></Label>
                        <Input id="email" type="email" placeholder="seu@email.com.br*" className="border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm">Telefone <span className="text-red-500">*</span></Label>
                        <Input id="phone" type="tel" placeholder="(11) 91234-5678*" className="border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]" required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" className="w-full bg-[var(--color-text-dark)] text-[var(--color-background)] hover:bg-[var(--color-primary)] hover:text-white uppercase tracking-wider py-6">
                      Receba seu Orçamento
                    </Button>
                  </div>
                </div>
              </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}
