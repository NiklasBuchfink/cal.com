import { ArrowDownIcon } from "@heroicons/react/outline";
import { TimeUnit, WorkflowStep, WorkflowTriggerEvents } from "@prisma/client";
import { FormValues } from "pages/workflows/[workflow]";
import { Controller, UseFormReturn } from "react-hook-form";

import Select from "@calcom/ui/form/Select";

import { useLocale } from "@lib/hooks/useLocale";
import { WORKFLOW_ACTIONS, WORKFLOW_TRIGGER_EVENTS } from "@lib/workflows/constants";

type WorkflowStepProps = {
  trigger?: WorkflowTriggerEvents;
  time?: number;
  timeUnit?: TimeUnit;
  step?: WorkflowStep;
  form: UseFormReturn<FormValues, any>;
};

export default function WorkflowStepContainer(props: WorkflowStepProps) {
  const { t } = useLocale();
  const { step, trigger, time, timeUnit, form } = props;

  const actions = WORKFLOW_ACTIONS.map((action) => {
    return { label: t(`${action.toLowerCase()}_action`), value: action };
  });

  const triggers = WORKFLOW_TRIGGER_EVENTS.map((triggerEvent) => {
    return { label: t(`${triggerEvent.toLowerCase()}_trigger`), value: triggerEvent };
  });

  //make overall design reusable
  if (trigger) {
    const selectedTrigger = { label: t(`${trigger.toLowerCase()}_trigger`), value: trigger };

    return (
      <>
        <div className="flex justify-center">
          <div className=" mt-0 w-[50rem] rounded border-2 bg-gray-100 px-10 pb-9 pt-5 sm:mt-5">
            <div className="font-bold">{t("triggers")}:</div>
            <Controller
              name="trigger"
              control={form.control}
              render={() => {
                return (
                  <Select
                    isSearchable={false}
                    className="mt-3 block w-full min-w-0 flex-1 rounded-sm sm:text-sm"
                    onChange={(val) => {
                      if (val) {
                        form.setValue("trigger", val.value);
                      }
                    }}
                    defaultValue={selectedTrigger}
                    options={triggers}
                  />
                );
              }}
            />

            {time && timeUnit && (
              <span>
                {time} {t(`${timeUnit.toLowerCase()}_timeUnit`)}{" "}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <ArrowDownIcon className="mt-2 h-8 stroke-[1.5px] text-gray-500 sm:mt-5" />
        </div>
      </>
    );
  }

  if (step) {
    const selectedAction = { label: t(`${step.action.toLowerCase()}_action`), value: step.action };

    return (
      <>
        <div className="flex justify-center">
          <div className=" mt-3 w-[50rem] rounded border-2 bg-gray-100 px-10 pb-9 pt-5 sm:mt-5">
            <div className="font-bold">{t("action")}:</div>
            <div>
              <Controller
                name="steps"
                control={form.control}
                render={() => {
                  return (
                    <Select
                      isSearchable={false}
                      className="mt-3 block w-full min-w-0 flex-1 rounded-sm sm:text-sm"
                      onChange={(val) => {
                        if (val) {
                          form.setValue("steps", []);
                        }
                      }}
                      defaultValue={selectedAction}
                      options={actions}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-center sm:mt-5">
          <ArrowDownIcon className="h-8 stroke-[1.5px] text-gray-500" />
        </div>
      </>
    );
  }

  return <></>;
}
