import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Edit",
};

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const id = params.id;

  const invoice = await fetchInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />

      <Form invoice={invoice} customers={customers} />
    </main>
  );
};

export default Page;
