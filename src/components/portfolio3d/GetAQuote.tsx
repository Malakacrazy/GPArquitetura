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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

/**
 * Zod validation schema for the quote form
 */
const quoteFormSchema = z.object({
  // Project details
  floors: z.string().min(1, "Quantidade de pavimentos é obrigatória").refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Deve ser um número maior que 0"
  }),
  area: z.string().min(1, "Metragem é obrigatória").refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Deve ser um número maior que 0"
  }),

  // Contact information
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().min(1, "Email é obrigatório").email("Formato de email inválido"),
  phone: z.string().min(8, "Telefone é obrigatório"),

  // External images
  externalValue: z.boolean().nullable(),
  externalCount: z.string().optional(),

  // Internal images
  internalValue: z.boolean().nullable(),
  internalCount: z.string().optional(),

  // Humanized plans
  humanizedValue: z.boolean().nullable(),
  humanizedCount: z.string().optional(),

  // Animation
  animationValue: z.boolean().nullable(),
  animationType: z.string().nullable(),
  animationCount: z.string().optional(),
  animationDuration: z.string().optional(),

  // Virtual tour
  tourValue: z.boolean().nullable(),
  tourType: z.string().nullable(),
  tourRooms: z.string().optional(),
}).refine((data) => {
  // Validate external count if external is selected
  if (data.externalValue === true) {
    return data.externalCount && !isNaN(Number(data.externalCount)) && Number(data.externalCount) > 0;
  }
  return true;
}, {
  message: "Quantidade de imagens externas é obrigatória",
  path: ["externalCount"]
}).refine((data) => {
  // Validate internal count if internal is selected
  if (data.internalValue === true) {
    return data.internalCount && !isNaN(Number(data.internalCount)) && Number(data.internalCount) > 0;
  }
  return true;
}, {
  message: "Quantidade de imagens internas é obrigatória",
  path: ["internalCount"]
}).refine((data) => {
  // Validate humanized count if humanized is selected
  if (data.humanizedValue === true) {
    return data.humanizedCount && !isNaN(Number(data.humanizedCount)) && Number(data.humanizedCount) > 0;
  }
  return true;
}, {
  message: "Quantidade de plantas humanizadas é obrigatória",
  path: ["humanizedCount"]
}).refine((data) => {
  // Validate animation type if animation is selected
  if (data.animationValue === true) {
    return data.animationType !== null;
  }
  return true;
}, {
  message: "Selecione o tipo de animação",
  path: ["animationType"]
}).refine((data) => {
  // Validate animation count if animation is selected
  if (data.animationValue === true) {
    return data.animationCount && !isNaN(Number(data.animationCount)) && Number(data.animationCount) > 0;
  }
  return true;
}, {
  message: "Quantidade de animações é obrigatória",
  path: ["animationCount"]
}).refine((data) => {
  // Validate animation duration if animation is selected
  if (data.animationValue === true) {
    return data.animationDuration && data.animationDuration.length > 0;
  }
  return true;
}, {
  message: "Tempo de animação é obrigatório",
  path: ["animationDuration"]
}).refine((data) => {
  // Validate tour type if tour is selected
  if (data.tourValue === true) {
    return data.tourType !== null;
  }
  return true;
}, {
  message: "Selecione o tipo de tour",
  path: ["tourType"]
}).refine((data) => {
  // Validate tour rooms if Parcial tour is selected
  if (data.tourValue === true && data.tourType === 'Parcial') {
    return data.tourRooms && !isNaN(Number(data.tourRooms)) && Number(data.tourRooms) > 0;
  }
  return true;
}, {
  message: "Quantidade de ambientes é obrigatória",
  path: ["tourRooms"]
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

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
  const { register, handleSubmit, watch, setValue, control, clearErrors, reset, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: 'onChange',
    defaultValues: {
      floors: '',
      area: '',
      name: '',
      email: '',
      phone: '',
      externalValue: null,
      externalCount: '',
      internalValue: null,
      internalCount: '',
      humanizedValue: null,
      humanizedCount: '',
      animationValue: null,
      animationType: null,
      animationCount: '',
      animationDuration: '',
      tourValue: null,
      tourType: null,
      tourRooms: ''
    }
  });

  // State for dialog open/close
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for uploaded files
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Watch all form values for budget calculation and conditional rendering
  const formValues = watch();

  /**
   * Handles boolean selection toggle (Yes/No buttons)
   * Clicking the same value again deselects it
   *
   * @param field - The form field name
   * @param value - The boolean value to set
   */
  const handleSelection = (field: keyof QuoteFormData, value: boolean) => {
    const currentValue = formValues[field];
    const newValue = currentValue === value ? null : value;
    setValue(field as any, newValue);

    // Clear related errors when deselecting (setting to null)
    if (newValue === null) {
      if (field === 'externalValue') {
        clearErrors('externalCount');
      } else if (field === 'internalValue') {
        clearErrors('internalCount');
      } else if (field === 'humanizedValue') {
        clearErrors('humanizedCount');
      } else if (field === 'animationValue') {
        clearErrors(['animationType', 'animationCount', 'animationDuration']);
      } else if (field === 'tourValue') {
        clearErrors(['tourType', 'tourRooms']);
      }
    }
  };

  /**
   * Handles file selection from input
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  /**
   * Handles file drop
   */
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  /**
   * Handles file removal
   */
  const handleFileRemove = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Prevents default drag behavior
   */
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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
    if (formValues.externalValue) total += (parseInt(formValues.externalCount || '0') || 0) * 1500;
    if (formValues.internalValue) total += (parseInt(formValues.internalCount || '0') || 0) * 1200;
    if (formValues.humanizedValue) total += (parseInt(formValues.humanizedCount || '0') || 0) * 800;
    if (formValues.animationValue) {
      const count = parseInt(formValues.animationCount || '0') || 0;
      const seconds = parseInt((formValues.animationDuration || '').replace(/\D/g, '')) || 0;
      total += count * (3000 + seconds * 100);
    }
    if (formValues.tourValue) {
      if (formValues.tourType === 'Completo') total += 5000;
      else total += 2000 + (parseInt(formValues.tourRooms || '0') || 0) * 500;
    }
    return total;
  };

  /**
   * Handles form submission
   */
  const onSubmit = (data: QuoteFormData) => {
    console.log('Form submitted:', data);
    console.log('Uploaded files:', uploadedFiles);
    // TODO: Add API call to submit the quote request with files
    alert('Orçamento enviado com sucesso! Entraremos em contato em breve.');

    // Reset form and close dialog
    reset();
    setUploadedFiles([]);
    setIsDialogOpen(false);
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full h-full overflow-y-auto p-6 sm:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--color-primary)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[var(--color-accent)]">
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
                      <Controller
                        name="floors"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            min="1"
                            placeholder="Ex: 2"
                            className={`flex h-9 w-full rounded-md border px-3 py-1 text-base outline-none transition-colors bg-white ${
                              errors.floors ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                            } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                          />
                        )}
                      />
                      {errors.floors && <p className="text-xs text-red-500 mt-1">{errors.floors.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">m² por pavimentos</Label>
                      <Controller
                        name="area"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            min="0"
                            placeholder="Ex: 150"
                            className={`flex h-9 w-full rounded-md border px-3 py-1 text-base outline-none transition-colors bg-white ${
                              errors.area ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                            } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                          />
                        )}
                      />
                      {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area.message}</p>}
                    </div>
                  </div>

                  {/* External Images */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Imagens Externas?</Label>
                    <div className="flex items-center gap-4 min-h-[40px]">
                      <AnimatePresence mode="popLayout">
                        {(formValues.externalValue === null || formValues.externalValue === true) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              type="button"
                              variant={formValues.externalValue === true ? "default" : "outline"}
                              onClick={() => handleSelection('externalValue', true)}
                              className={`border-[var(--color-text-dark)] ${formValues.externalValue === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Sim
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="popLayout">
                        {(formValues.externalValue === null || formValues.externalValue === false) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              type="button"
                              variant={formValues.externalValue === false ? "default" : "outline"}
                              onClick={() => handleSelection('externalValue', false)}
                              className={`border-[var(--color-text-dark)] ${formValues.externalValue === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Não
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {formValues.externalValue === true && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                          >
                            <Label className="text-sm whitespace-nowrap">Quantas?</Label>
                            <Controller
                              name="externalCount"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  className={`w-20 h-9 rounded-md border px-2 text-base outline-none transition-colors bg-white ${
                                    errors.externalCount ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                                  } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                                />
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {errors.externalCount && <p className="text-xs text-red-500 mt-1">{errors.externalCount.message}</p>}
                  </div>

                  {/* Internal Images */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Imagens Internas?</Label>
                    <div className="flex items-center gap-4 min-h-[40px]">
                      <AnimatePresence mode="popLayout">
                        {(formValues.internalValue === null || formValues.internalValue === true) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              type="button"
                              variant={formValues.internalValue === true ? "default" : "outline"}
                              onClick={() => handleSelection('internalValue', true)}
                              className={`border-[var(--color-text-dark)] ${formValues.internalValue === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Sim
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="popLayout">
                        {(formValues.internalValue === null || formValues.internalValue === false) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              type="button"
                              variant={formValues.internalValue === false ? "default" : "outline"}
                              onClick={() => handleSelection('internalValue', false)}
                              className={`border-[var(--color-text-dark)] ${formValues.internalValue === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Não
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {formValues.internalValue === true && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                          >
                            <Label className="text-sm whitespace-nowrap">Quantas?</Label>
                            <Controller
                              name="internalCount"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  className={`w-20 h-9 rounded-md border px-2 text-base outline-none transition-colors bg-white ${
                                    errors.internalCount ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                                  } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                                />
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {errors.internalCount && <p className="text-xs text-red-500 mt-1">{errors.internalCount.message}</p>}
                  </div>

                  {/* Humanized Plans */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Plantas Humanizadas?</Label>
                    <div className="flex items-center gap-4 min-h-[40px]">
                      <AnimatePresence mode="popLayout">
                        {(formValues.humanizedValue === null || formValues.humanizedValue === true) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              type="button"
                              variant={formValues.humanizedValue === true ? "default" : "outline"}
                              onClick={() => handleSelection('humanizedValue', true)}
                              className={`border-[var(--color-text-dark)] ${formValues.humanizedValue === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Sim
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="popLayout">
                        {(formValues.humanizedValue === null || formValues.humanizedValue === false) && (
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                              type="button"
                              variant={formValues.humanizedValue === false ? "default" : "outline"}
                              onClick={() => handleSelection('humanizedValue', false)}
                              className={`border-[var(--color-text-dark)] ${formValues.humanizedValue === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                            >
                              Não
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {formValues.humanizedValue === true && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                          >
                            <Label className="text-sm whitespace-nowrap">Quantas?</Label>
                            <Controller
                              name="humanizedCount"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  className={`w-20 h-9 rounded-md border px-2 text-base outline-none transition-colors bg-white ${
                                    errors.humanizedCount ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                                  } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                                />
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {errors.humanizedCount && <p className="text-xs text-red-500 mt-1">{errors.humanizedCount.message}</p>}
                  </div>

                  {/* Animation */}
                  <div className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Animação?</Label>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 min-h-[40px]">
                        <AnimatePresence mode="popLayout">
                          {(formValues.animationValue === null || formValues.animationValue === true) && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                              <Button
                                type="button"
                                variant={formValues.animationValue === true ? "default" : "outline"}
                                onClick={() => handleSelection('animationValue', true)}
                                className={`border-[var(--color-text-dark)] ${formValues.animationValue === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                              >
                                Sim
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence mode="popLayout">
                          {(formValues.animationValue === null || formValues.animationValue === false) && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                              <Button
                                type="button"
                                variant={formValues.animationValue === false ? "default" : "outline"}
                                onClick={() => handleSelection('animationValue', false)}
                                className={`border-[var(--color-text-dark)] ${formValues.animationValue === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                              >
                                Não
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {formValues.animationValue === true && (
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
                                    const isSelected = formValues.animationType === type;
                                    const isHidden = formValues.animationType !== null && !isSelected;

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
                                          type="button"
                                          size="sm"
                                          variant={isSelected ? "default" : "outline"}
                                          onClick={() => setValue('animationType', isSelected ? null : type, { shouldValidate: true })}
                                          className={`text-xs border-[var(--color-text-dark)]/50 ${isSelected ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                                        >
                                          {type}
                                        </Button>
                                      </motion.div>
                                    );
                                  })}
                                </AnimatePresence>
                              </div>
                              {errors.animationType && <p className="text-xs text-red-500 mt-1">{errors.animationType.message}</p>}
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Label className="text-sm whitespace-nowrap">Quantas?</Label>
                                    <Controller
                                      name="animationCount"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="number"
                                          className={`w-16 h-8 rounded-md border px-2 text-base outline-none transition-colors bg-white ${
                                            errors.animationCount ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                                          } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Label className="text-sm whitespace-nowrap">Tempo?</Label>
                                    <Controller
                                      name="animationDuration"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="text"
                                          placeholder="Ex: 30s"
                                          className={`w-24 h-8 rounded-md border px-2 text-base outline-none transition-colors bg-white ${
                                            errors.animationDuration ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                                          } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                {(errors.animationCount || errors.animationDuration) && (
                                  <div className="text-xs text-red-500">
                                    {errors.animationCount && <p>{errors.animationCount.message}</p>}
                                    {errors.animationDuration && <p>{errors.animationDuration.message}</p>}
                                  </div>
                                )}
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
                          {(formValues.tourValue === null || formValues.tourValue === true) && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                              <Button
                                type="button"
                                variant={formValues.tourValue === true ? "default" : "outline"}
                                onClick={() => handleSelection('tourValue', true)}
                                className={`border-[var(--color-text-dark)] ${formValues.tourValue === true ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                              >
                                Sim
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence mode="popLayout">
                          {(formValues.tourValue === null || formValues.tourValue === false) && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                              <Button
                                type="button"
                                variant={formValues.tourValue === false ? "default" : "outline"}
                                onClick={() => handleSelection('tourValue', false)}
                                className={`border-[var(--color-text-dark)] ${formValues.tourValue === false ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                              >
                                Não
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {formValues.tourValue === true && (
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
                                    const isSelected = formValues.tourType === type;
                                    const isHidden = formValues.tourType !== null && !isSelected;

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
                                          type="button"
                                          size="sm"
                                          variant={isSelected ? "default" : "outline"}
                                          onClick={() => setValue('tourType', isSelected ? null : type, { shouldValidate: true })}
                                          className={`text-xs border-[var(--color-text-dark)]/50 ${isSelected ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90" : "hover:bg-[var(--color-text-muted)]/60 hover:text-white/90"}`}
                                        >
                                          {type}
                                        </Button>
                                      </motion.div>
                                    );
                                  })}
                                </AnimatePresence>
                              </div>
                              {errors.tourType && <p className="text-xs text-red-500 mt-1">{errors.tourType.message}</p>}

                              {formValues.tourType === 'Parcial' && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="flex items-center gap-2"
                                >
                                  <Label className="text-sm whitespace-nowrap">Quantos ambientes?</Label>
                                  <Controller
                                    name="tourRooms"
                                    control={control}
                                    render={({ field }) => (
                                      <input
                                        {...field}
                                        type="number"
                                        className={`w-20 h-8 rounded-md border px-2 text-base outline-none transition-colors bg-white ${
                                          errors.tourRooms ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                                        } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                                      />
                                    )}
                                  />
                                </motion.div>
                              )}
                              {errors.tourRooms && <p className="text-xs text-red-500 mt-1">{errors.tourRooms.message}</p>}
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
                    <div
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-[var(--color-text-dark)]/30 rounded-lg p-3 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer group"
                    >
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*,.pdf,.dwg,.skp"
                      />
                      <div className="mb-1 text-[var(--color-primary)] opacity-50 group-hover:opacity-100 transition-opacity">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                      </div>
                      <p className="text-xs opacity-70">Arraste os arquivos aqui ou</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="mt-1 h-7 text-xs border-[var(--color-text-dark)] hover:bg-[var(--color-text-dark)] hover:text-[var(--color-background)]"
                      >
                        Selecione os arquivos
                      </Button>
                      <p className="text-[10px] opacity-50 mt-1">Tamanho max. dos arquivos: 512 MB</p>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-[var(--color-primary)]/10 p-2 rounded text-xs">
                            <span className="truncate flex-1">{file.name}</span>
                            <span className="text-[10px] opacity-50 mx-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            <button
                              type="button"
                              onClick={() => handleFileRemove(index)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="uppercase text-xs tracking-wider opacity-70 text-sm">Como podemos entrar em contato?</Label>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm">Nome <span className="text-red-500">*</span></Label>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="name"
                              placeholder="João da Silva"
                              className={`flex h-9 w-full rounded-md border px-3 py-1 text-base outline-none transition-colors bg-white ${
                                errors.name ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                              } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                            />
                          )}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm">Email <span className="text-red-500">*</span></Label>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="email"
                              type="text"
                              placeholder="seu@email.com.br"
                              className={`flex h-9 w-full rounded-md border px-3 py-1 text-base outline-none transition-colors bg-white ${
                                errors.email ? 'border-red-500' : 'border-[var(--color-text-dark)]/30'
                              } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                            />
                          )}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm">Telefone <span className="text-red-500">*</span></Label>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <PhoneInput
                              defaultCountry="br"
                              value={value}
                              onChange={onChange}
                              placeholder="(11) 91234-5678"
                              inputStyle={{
                                width: '100%',
                                height: '36px',
                                fontSize: '14px',
                                borderColor: errors.phone ? '#ef4444' : 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '6px',
                              }}
                              countrySelectorStyleProps={{
                                buttonStyle: {
                                  borderColor: errors.phone ? '#ef4444' : 'rgba(0, 0, 0, 0.2)',
                                  borderRadius: '6px 0 0 6px',
                                }
                              }}
                            />
                          )}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" className="w-full bg-[var(--color-text-dark)] text-[var(--color-background)] hover:bg-[var(--color-primary)] hover:text-white uppercase tracking-wider py-6 cursor-pointer">
                      Receba seu Orçamento
                    </Button>
                  </div>
                </div>
              </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}
