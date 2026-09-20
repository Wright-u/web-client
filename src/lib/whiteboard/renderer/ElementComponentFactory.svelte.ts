import type { Component } from 'svelte';
import type RenderElement from './RenderElement';

export type ElementComponent = Component<{ element: RenderElement }>;

export default class ElementComponentFactory {
	private readonly components: Record<string, ElementComponent>;

	constructor(components: Record<string, ElementComponent> = {}) {
		this.components = {
			...components
		};
	}

	get(type: string): ElementComponent | undefined {
		return this.components[type];
	}
}
