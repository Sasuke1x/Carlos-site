import {
  Home,
  KeyRound,
  HardHat,
  Building2,
  Wrench,
  Hammer,
  Sparkles,
  Shield,
  BarChart3,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Bot,
  Cog,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "../types";

/**
 * Maps the icon enum values from the Sanity schema (serviceCard.ts) to
 * lucide-react icon components. Components looking up an icon should
 * fall back to a sensible default if the icon is undefined.
 */
export const ICON_MAP: Record<IconName, LucideIcon> = {
  home: Home,
  key: KeyRound,
  hardhat: HardHat,
  building: Building2,
  wrench: Wrench,
  tools: Hammer,
  sparkles: Sparkles,
  shield: Shield,
  chart: BarChart3,
  heart: Heart,
  star: Star,
  phone: Phone,
  mail: Mail,
  mappin: MapPin,
  bot: Bot,
  cog: Cog,
};

export function getIcon(name: IconName | string | undefined, fallback: LucideIcon = Home): LucideIcon {
  if (!name) return fallback;
  return (ICON_MAP as Record<string, LucideIcon>)[name] ?? fallback;
}
