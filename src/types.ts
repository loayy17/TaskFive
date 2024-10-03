import type { Component } from "vue";

export type TTabKey = 'General' | 'Notifications' | 'Privacy';
export interface ITab {
  key: TTabKey;
  label: string;
  component: Component
}
