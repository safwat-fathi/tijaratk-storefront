import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
	id: number;
	slug: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	storefrontId: number;
	stock?: number;
}

interface CartState {
	items: CartItem[];
	isOpen: boolean;
	addItem: (item: CartItem, options?: { openDrawer?: boolean }) => void;
	removeItem: (itemId: number) => void;
	updateQuantity: (itemId: number, quantity: number) => void;
	clearCart: () => void;
	toggleCart: () => void;
	setOpen: (open: boolean) => void;
	totalItems: () => number;
	totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			isOpen: false,

			addItem: (newItem, options) => {
				set(state => {
					const shouldOpen = options?.openDrawer ?? true; // Default to true
					const existingItem = state.items.find(item => item.id === newItem.id);
					if (existingItem) {
						const newQuantity = existingItem.quantity + newItem.quantity;
						// Use the latest stock from newItem (fresh from product page)
						const currentStock = newItem.stock ?? existingItem.stock;
						// Check stock limit
						if (currentStock && newQuantity > currentStock) {
							return {
								items: state.items,
								isOpen: shouldOpen ? true : state.isOpen,
							}; // respecting options
						}

						return {
							items: state.items.map(item =>
								item.id === newItem.id
									? { ...item, quantity: newQuantity, stock: currentStock }
									: item
							),
							isOpen: shouldOpen ? true : state.isOpen,
						};
					}
					// Check stock limit for new item
					if (newItem.stock && newItem.quantity > newItem.stock) {
						return {
							items: state.items,
							isOpen: shouldOpen ? true : state.isOpen,
						};
					}

					return {
						items: [...state.items, newItem],
						isOpen: shouldOpen ? true : state.isOpen,
					};
				});
			},

			removeItem: itemId => {
				set(state => ({
					items: state.items.filter(item => item.id !== itemId),
				}));
			},

			updateQuantity: (itemId, quantity) => {
				if (quantity < 1) {
					if (quantity === 0) {
						set(state => ({
							items: state.items.filter(item => item.id !== itemId),
						}));
						return;
					}
				}
				set(state => {
					const item = state.items.find(i => i.id === itemId);
					if (item && item.stock && quantity > item.stock) {
						return { items: state.items };
					}
					return {
						items: state.items.map(item =>
							item.id === itemId ? { ...item, quantity } : item
						),
					};
				});
			},

			clearCart: () => set({ items: [] }),

			toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
			setOpen: open => set({ isOpen: open }),

			totalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},

			totalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
			},
		}),
		{
			name: "tijaratk-cart-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({ items: state.items }),
		}
	)
);
