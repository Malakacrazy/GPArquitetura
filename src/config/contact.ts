/**
 * Centralized Contact Configuration
 *
 * This file is the SINGLE SOURCE OF TRUTH for all contact information
 * across the GP Arquitetura website. Any changes to contact details
 * should be made here and will automatically propagate to all components.
 *
 * @module config/contact
 * @author GP Arquitetura Development Team
 * @since 1.0.0
 *
 * Usage:
 * ```typescript
 * import { contact, socialLinks, getWhatsAppUrl } from '../config/contact';
 *
 * // Use in components
 * <a href={contact.whatsapp.url}>{contact.whatsapp.display}</a>
 * <a href={contact.email.url}>{contact.email.address}</a>
 * ```
 */

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

/**
 * Primary contact details for GP Arquitetura
 * Includes phone, email, and location information
 */
export const contact = {
  /**
   * WhatsApp contact information
   * Phone number format: Country code + Area code + Number (no spaces or dashes)
   */
  whatsapp: {
    /** Raw phone number for API calls */
    number: '5511947739339',
    /** Formatted display string for UI */
    display: '(11) 94773-9339',
    /** Pre-built WhatsApp API URL */
    url: 'https://api.whatsapp.com/send?phone=5511947739339',
  },

  /**
   * Email contact information
   */
  email: {
    /** Email address */
    address: 'giuliap.arquitetura@gmail.com',
    /** Pre-built mailto URL */
    url: 'mailto:giuliap.arquitetura@gmail.com',
  },

  /**
   * Physical location information
   */
  location: {
    /** City name */
    city: 'São Paulo',
    /** State/Region */
    state: 'São Paulo',
    /** Country */
    country: 'Brasil',
    /** Full formatted address for display */
    display: 'São Paulo, São Paulo\nBrasil',
    /** Timezone for business hours calculation */
    timezone: 'America/Sao_Paulo',
  },

  /**
   * Business hours information
   */
  businessHours: {
    /** Opening hour (24h format) */
    openHour: 9,
    /** Closing hour (24h format) */
    closeHour: 18,
    /** Working days (0 = Sunday, 6 = Saturday) */
    workDays: [1, 2, 3, 4, 5], // Monday to Friday
  },
} as const;

// =============================================================================
// SOCIAL MEDIA LINKS
// =============================================================================

/**
 * Social media profile links for GP Arquitetura
 * All links open in new tab with proper security attributes
 */
export const socialLinks = {
  /**
   * Instagram profile
   */
  instagram: {
    /** Profile URL */
    url: 'https://www.instagram.com/giuliaparente_parquitetura',
    /** Username for display */
    username: '@giuliaparente_parquitetura',
    /** Platform name */
    platform: 'Instagram',
  },

  /**
   * LinkedIn profile
   */
  linkedin: {
    /** Profile URL */
    url: 'https://www.linkedin.com/in/giulia-parente',
    /** Username/slug for display */
    username: 'giulia-parente',
    /** Platform name */
    platform: 'LinkedIn',
  },

  /**
   * Pinterest profile
   */
  pinterest: {
    /** Profile URL */
    url: 'https://www.pinterest.com/giuliaparentearq',
    /** Username for display */
    username: 'giuliaparentearq',
    /** Platform name */
    platform: 'Pinterest',
  },
} as const;

// =============================================================================
// COMPANY INFORMATION
// =============================================================================

/**
 * Company/brand information for GP Arquitetura
 */
export const company = {
  /** Full legal name */
  legalName: 'Giulia Parente Arquitetura',
  /** Brand name for display */
  brandName: 'GP Arquitetura',
  /** Owner/Founder name */
  founder: 'Giulia Parente',
  /** Year established */
  foundedYear: 2020,
  /** Current year for copyright */
  copyrightYear: new Date().getFullYear(),
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Generates a WhatsApp URL with optional pre-filled message
 *
 * @param message - Optional message to pre-fill in WhatsApp
 * @returns Complete WhatsApp API URL
 *
 * @example
 * ```typescript
 * const url = getWhatsAppUrl('Olá, gostaria de um orçamento');
 * // Returns: "https://api.whatsapp.com/send?phone=5511947739339&text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento"
 * ```
 */
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = `https://api.whatsapp.com/send?phone=${contact.whatsapp.number}`;
  if (message) {
    return `${baseUrl}&text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

/**
 * Checks if the business is currently open based on São Paulo timezone
 *
 * @returns Object with isOpen status and current time string
 *
 * @example
 * ```typescript
 * const { isOpen, timeString } = getBusinessStatus();
 * // Returns: { isOpen: true, timeString: "2:30 PM São Paulo" }
 * ```
 */
export function getBusinessStatus(): { isOpen: boolean; timeString: string } {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: contact.location.timezone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const hourFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: contact.location.timezone,
    hour: 'numeric',
    hour12: false,
  });

  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: contact.location.timezone,
    weekday: 'short',
  });

  const currentHour = parseInt(hourFormatter.format(now));
  const currentDay = dayFormatter.format(now);
  const timeString = formatter.format(now);

  // Check if it's a working day (not Saturday or Sunday)
  const isWorkday = currentDay !== 'Sat' && currentDay !== 'Sun';

  // Check if within business hours
  const isWithinHours =
    currentHour >= contact.businessHours.openHour &&
    currentHour < contact.businessHours.closeHour;

  return {
    isOpen: isWorkday && isWithinHours,
    timeString: `${timeString} São Paulo`,
  };
}

/**
 * Returns all social links as an array for easy iteration
 *
 * @returns Array of social link objects
 *
 * @example
 * ```typescript
 * getSocialLinksArray().map(social => (
 *   <a href={social.url}>{social.platform}</a>
 * ))
 * ```
 */
export function getSocialLinksArray() {
  return Object.values(socialLinks);
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

/** Type for contact information */
export type Contact = typeof contact;

/** Type for social links */
export type SocialLinks = typeof socialLinks;

/** Type for company information */
export type Company = typeof company;
