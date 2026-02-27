import { redirect } from "next/navigation";

export default function Home() {
  // تحويل تلقائي لمصر كافتراضي
  redirect("/eg");
}