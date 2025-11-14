'use client';
import React, { useState } from "react";
import Bton from "../buttons/page";
import Link from "next/link";
import getActiveUserId from "../../../utils/user";

export default function ProCard({
    _id,
    image,
    title,
    description,
    cost,
    userId,
    actionLabel,
    onAction,
    leadingControls,
    isAdding = false,
    onAddingChange,
}) {
    const activeUserId = userId || getActiveUserId();
    const unitPrice = parseFloat(String(cost || 0).replace(/[^0-9.]/g, ''));

    async function handleAddToCart() {
        if (onAddingChange) onAddingChange(true);
        try {
            const res = await fetch("http://localhost:5000/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: activeUserId, productId: _id }),
            });
            const data = await res.json();
            console.log("Added to cart:", data);
        } catch (err) {
            console.error("Failed to add to cart:", err);
        } finally {
            if (onAddingChange) onAddingChange(false);
        }
    }

    const primaryAction = onAction || handleAddToCart;
    const primaryLabel = actionLabel || (isAdding ? "Adding..." : "Add to Cart");

    return (
        <div className="card h-[29rem] w-full bg-neutral-900 rounded-md border-l-4 border-purple-900 border-b-4">
            <figure>
                <img
                    src={`./images/${image}`}
                    alt="loading"
                    className="h-64 w-full object-cover rounded-t-md"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title py-4 px-2.5 font-bold text-lg">{title}</h2>
                <p className="px-2.5 py-0">{description}</p>
                <h6 className="px-2.5 mt-1.5 font-bold text-xl">{cost}</h6>
                <div className="flex items-center justify-between gap-3 px-2.5 mt-2">
                    {leadingControls && (
                        <div className="flex items-center justify-start gap-2">
                            {leadingControls}
                        </div>
                    )}
                    <div className="flex gap-3 w-full justify-end text-sm">
                        <Link href={`/payment?price=${unitPrice}`}>
                            <Bton
                                title="Buy"
                                border="border-purple-500"
                                color="bg-purple-400"
                            />
                        </Link>
                        <Bton
                            act={primaryAction}
                            title={primaryLabel}
                            border="border-pink-400"
                            color="bg-pink-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
