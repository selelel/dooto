import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TaskSection({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <Card id={id} className='mb-6'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>{children}</CardContent>
    </Card>
  );
}
