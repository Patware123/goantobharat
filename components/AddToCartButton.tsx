"use client";
import { useAppDispatch } from "@/store";
import { addItem } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

type Props = { id: string; name: string; price: number; image?: string };

export default function AddToCartButton({ id, name, price, image }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAdd = () => {
    dispatch(addItem({ id, name, price, image }));
    router.push("/cart");
  };

  return (
    <button
      onClick={handleAdd}
      className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition"
    >
      Add to Cart
    </button>
  );
}
