import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { images } from "../config/assets";

export function HowItWorks() {
  const [projectType, setProjectType] = useState("Residential");

  const residentialOptions = [
    "Facade", "Streetscape", "Living / Kitchen / Dining", "Kitchen", 
    "Living / Alfresco", "Bathroom", "Bedroom", "Alfresco / Backyard", 
    "Photomontage", "Floor Plans"
  ];

  const commercialOptions = [
    "Industrial", "Office Fit Out", "Retail Fit Out", "Education/Childcare",
    "Sporting/Gym", "Reception", "Floor Plans"
  ];

  const currentOptions = projectType === "Residential" ? residentialOptions : commercialOptions;

  return (
    <section className="bg-[var(--color-background)] text-[var(--color-text-dark)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 overflow-hidden">
      <div className="mx-auto relative w-full">
        <span className="block text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] mb-4 md:mb-6 uppercase">How It Works</span>

        <div className="flex flex-col gap-12 md:gap-20">
          {[
            {
              title: "Technical Specification",
              description: "The client contacts us and messages across design specifications for architectural visualizations, as well as all the necessary files associated with this project.",
              image: images.howItWorks.technicalSpec
            },
            {
              title: "Start of Work Process",
              description: "We create a working chat with a project manager, 3d artists (the number depends on the complexity of the project). We examine the terms of reference and together with the client determine the deadline for exterior renders.",
              image: images.howItWorks.workProcess
            },
            {
              title: "Preview No. 1",
              description: "We show the client the first draft in low quality to confirm the correctness of the model (structure, geometry, etc.). If necessary, we receive comments and edits from the client.",
              image: images.howItWorks.preview1
            },
            {
              title: "Preview No. 2",
              description: "The second draft is shown after applying the edits. At this time the image is in a higher quality so that the client can appreciate all the ins and outs of the image (light, color, textures, etc.) We get the final edits, if any.",
              image: images.howItWorks.preview2
            },
            {
              title: "Sending Final Renders",
              description: "We create architectural visualization in high quality and transfer it to the customer, having previously applied all comments and edits, if they were after the second draft showing.",
              image: images.howItWorks.finalRenders
            }
          ].map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Text Content */}
              <motion.div 
                className="w-full lg:flex-[2] space-y-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-normal uppercase tracking-wide text-[var(--color-text-dark)] flex flex-row items-baseline gap-2 md:gap-4">
                  <span className="text-[var(--color-primary)] font-medium text-lg md:text-2xl">
                    0{index + 1}
                  </span>
                  <span>
                    {step.title}
                  </span>
                </h3>

                <p className="text-base md:text-lg lg:text-xl text-[var(--color-text-dark)]/70 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </motion.div>

              {/* Image */}
              <motion.div 
                className="w-full lg:flex-[3]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                </div>
              </motion.div>
            </div>
          ))}
          
          {/* Call to Action */}
          <motion.div 
            className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl font-light text-[var(--color-text-dark)] leading-relaxed">
              How to get started with architectural rendering for your project? Easy - contact us right now, describe what visualization services you need and our team will spring into action as soon as possible.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button 
                  className="group relative mx-2 my-2 inline-block text-sm uppercase tracking-wider text-[var(--color-text-dark)] no-underline bg-transparent border-none cursor-pointer"
                >
                  <span className="absolute inset-0 bg-[var(--color-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative z-10 block px-6 py-3 transition-colors duration-300 text-[var(--color-text-dark)] group-hover:text-[var(--color-background)] uppercase text-xs flex items-center gap-2">
                    <h6>GET A QUOTE</h6>
                  </span>
                  <span className="absolute left-[-8px] right-[-8px] top-0 h-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
                  <span className="absolute left-[-8px] right-[-8px] bottom-0 h-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
                  <span className="absolute bottom-[-8px] top-[-8px] left-0 w-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
                  <span className="absolute bottom-[-8px] top-[-8px] right-0 w-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] bg-[var(--color-background)] text-[var(--color-text-dark)] border-[var(--color-text-dark)] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-light uppercase tracking-wide text-[36px]">Request a quote</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="uppercase text-xs tracking-wider opacity-70">Tab Option <span className="text-red-500">*</span></Label>
                      <RadioGroup 
                        defaultValue="Residential" 
                        onValueChange={(value) => setProjectType(value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Residential" id="r1" className="border-[var(--color-text-dark)] text-[var(--color-primary)]" />
                          <Label htmlFor="r1">Residential</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Commercial" id="r2" className="border-[var(--color-text-dark)] text-[var(--color-primary)]" />
                          <Label htmlFor="r2">Commercial</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="uppercase text-xs tracking-wider opacity-70">What 3D Renders do you require?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {currentOptions.map((item) => (
                          <div key={item} className="flex items-center space-x-2">
                            <Checkbox id={item} className="border-[var(--color-text-dark)] data-[state=checked]:bg-[var(--color-primary)] data-[state=checked]:border-[var(--color-primary)]" />
                            <Label htmlFor={item} className="text-sm font-normal">{item}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details" className="uppercase text-xs tracking-wider opacity-70">Or type here: Basement, attic, garage</Label>
                      <Textarea 
                        id="details" 
                        placeholder="Or type here: Basement, attic, garage" 
                        className="min-h-[100px] border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package" className="uppercase text-xs tracking-wider opacity-70">Select a Package</Label>
                      <Select>
                        <SelectTrigger className="w-full border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]">
                          <SelectValue placeholder="Or Select Package" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--color-background)] border-[var(--color-text-dark)]">
                          <SelectItem value="starter">01 Starter Package</SelectItem>
                          <SelectItem value="colour">02 Colour Package</SelectItem>
                          <SelectItem value="interior">03 Interior Package</SelectItem>
                          <SelectItem value="full">04 Full Home Package</SelectItem>
                          <SelectItem value="full-reel">05 Full Home Package + Reel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="uppercase text-xs tracking-wider opacity-70">Do you have drawings?</Label>
                      <div className="border-2 border-dashed border-[var(--color-text-dark)]/30 rounded-lg p-6 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                        <p className="text-sm opacity-70">Drop files here or</p>
                        <Button variant="outline" className="mt-2 border-[var(--color-text-dark)] hover:bg-[var(--color-text-dark)] hover:text-[var(--color-background)]">
                          Select files
                        </Button>
                        <p className="text-xs opacity-50 mt-2">Max. file size: 512 MB</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="uppercase text-xs tracking-wider opacity-70">How do we contact you?</Label>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm">Name <span className="text-red-500">*</span></Label>
                          <Input id="name" placeholder="Name*" className="border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm">Email <span className="text-red-500">*</span></Label>
                          <Input id="email" type="email" placeholder="Email*" className="border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm">Phone <span className="text-red-500">*</span></Label>
                          <Input id="phone" type="tel" placeholder="Phone*" className="border-[var(--color-text-dark)]/30 focus:border-[var(--color-primary)]" required />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full bg-[var(--color-text-dark)] text-[var(--color-background)] hover:bg-[var(--color-primary)] hover:text-white uppercase tracking-wider py-6">
                        Request Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </section>
  );
}