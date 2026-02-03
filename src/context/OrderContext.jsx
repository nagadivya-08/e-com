import React, { createContext, useState, useContext, useEffect } from "react";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    // Initialize with some mock previous orders so the page isn't empty initially
    const [orders, setOrders] = useState([
        {
            id: "ORD-2025-001",
            date: "2025-12-15",
            total: 12999,
            status: "Delivered",
            items: [{ name: "Running Shoes", price: 3499 }, { name: "Smart Watch", price: 4999 }]
        },
        {
            id: "ORD-2025-002",
            date: "2025-11-20",
            total: 899,
            status: "Delivered",
            items: [{ name: "Men's T-Shirt", price: 899 }]
        }
    ]);

    const addOrder = (order) => {
        const newOrder = {
            ...order,
            id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toISOString().split("T")[0],
            status: "Placed", // Initial status
            timeline: [
                { status: "Placed", date: new Date().toISOString().split("T")[0], completed: true },
                { status: "Processing", date: null, completed: false },
                { status: "Shipped", date: null, completed: false },
                { status: "Delivered", date: null, completed: false },
            ]
        };
        setOrders((prev) => [newOrder, ...prev]);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updatedTimeline = order.timeline.map(step => {
                    if (step.status === newStatus || order.timeline.findIndex(s => s.status === newStatus) > order.timeline.findIndex(s => s.status === step.status)) {
                        return { ...step, completed: true, date: new Date().toISOString().split("T")[0] };
                    }
                    return step;
                });
                return { ...order, status: newStatus, timeline: updatedTimeline };
            }
            return order;
        }));
    };

    const addOrderFeedback = (orderId, feedback) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, feedback } : order
        ));
    };

    const cancelOrder = (orderId, reason) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const cancelledTimeline = order.timeline.map(step => {
                    if (step.status === "Cancelled") {
                        return { ...step, completed: true, date: new Date().toISOString().split("T")[0] };
                    }
                    return step;
                });
                // If "Cancelled" step doesn't exist (mock data), add it
                if (!cancelledTimeline.find(s => s.status === "Cancelled")) {
                    cancelledTimeline.push({ status: "Cancelled", date: new Date().toISOString().split("T")[0], completed: true });
                }
                return { ...order, status: "Cancelled", cancellationReason: reason, timeline: cancelledTimeline };
            }
            return order;
        }));
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, addOrderFeedback, cancelOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
