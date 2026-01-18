import { TaskStatus } from "@/modules/tasks/types";
import { CircleCheck, Circle } from "lucide-react";

export const StatusIconRender = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.DONE:
      return <CircleCheck className='text-success' />;
    case TaskStatus.IN_PROGRESS:
      return <Circle className='animate-pulse text-primary' />;
    case TaskStatus.PENDING:
    default:
      return <Circle className='text-muted-foreground' />;
  }
};

export const StatusLabelRender = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.DONE:
      return "Done";
    case TaskStatus.IN_PROGRESS:
      return "In Progress";
    case TaskStatus.PENDING:
    default:
      return "Pending";
  }
};
