/**
 * UI Components — Complete Public API
 * @packageDocumentation @module @jules-halls/canvas-ui/ui
 *
 * All 35+ primitives exported from a single barrel.
 */

// Layout & Structure
export { Separator } from "./separator";
export { Skeleton } from "./skeleton";
export type { SkeletonProps } from "./skeleton";
export { Tree } from "./Tree";
export type { TreeProps, TreeNode } from "./Tree";
export { SplitPane } from "./SplitPane";
export type { SplitPaneProps } from "./SplitPane";

// Navigation
export { Breadcrumb } from "./breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./breadcrumb";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

// Forms & Inputs
export { Button } from "./button";
export { IconButton } from "./IconButton";
export type { IconButtonProps } from "./IconButton";
export { Input } from "./input";
export { Textarea } from "./textarea";
export { Label } from "./label";
export { Checkbox } from "./checkbox";
export { Switch } from "./switch";
export { Slider } from "./slider";
export { Select, SelectTrigger, SelectContent, SelectItem } from "./select";
export { Combobox } from "./Combobox";
export type { ComboboxProps, ComboboxOption } from "./Combobox";

// Data Display
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
export { Badge } from "./badge";
export { Avatar } from "./avatar";
export type { AvatarProps } from "./avatar";
export { DataTable } from "./data-table";
export type { DataTableProps, Column } from "./data-table";
export { Typography } from "./typography";

// Status & Feedback
export { StatusPill, stateToStatus } from "./status-pill";
export type { StatusPillProps } from "./status-pill";
export { Progress } from "./progress";
export type { ProgressProps } from "./progress";
export { Banner } from "./banner";
export type { BannerProps } from "./banner";
export { Tag, Chip, FilterChip } from "./chip";

// Overlays & Popups
export { Dialog, DialogTrigger, DialogContent } from "./dialog";
export type { DialogProps, DialogContentProps } from "./dialog";
export { Drawer, DrawerTrigger, DrawerContent } from "./drawer";
export type { DrawerProps, DrawerContentProps } from "./drawer";
export { Sheet } from "./Sheet";
export type { SheetProps } from "./Sheet";
export { Popover, PopoverTrigger, PopoverContent } from "./popover";
export type { PopoverProps, PopoverContentProps } from "./popover";
export { DropdownMenu } from "./DropdownMenu";
export type { DropdownMenuProps, MenuItem } from "./DropdownMenu";
export { ContextMenu } from "./ContextMenu";
export type { ContextMenuProps } from "./ContextMenu";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "./accordion";

// Notifications
export { ToastProvider, useToast } from "./toast";

// Command
export { CommandPalette } from "./command-palette";
export type { CommandPaletteProps, CommandItem } from "./command-palette";
