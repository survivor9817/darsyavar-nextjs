"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Combobox } from "@base-ui/react/combobox";

interface Fruit {
  label: string;
  value: string;
}

const fruits: Fruit[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Grape", value: "grape" },
  { label: "Mango", value: "mango" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Raspberry", value: "raspberry" },
  { label: "Blackberry", value: "blackberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Peach", value: "peach" },
  { label: "Pear", value: "pear" },
  { label: "Plum", value: "plum" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Watermelon", value: "watermelon" },
  { label: "Cantaloupe", value: "cantaloupe" },
  { label: "Honeydew", value: "honeydew" },
  { label: "Papaya", value: "papaya" },
  { label: "Guava", value: "guava" },
  { label: "Lychee", value: "lychee" },
  { label: "Pomegranate", value: "pomegranate" },
  { label: "Apricot", value: "apricot" },
  { label: "Grapefruit", value: "grapefruit" },
  { label: "Passionfruit", value: "passionfruit" },
];

const ui = {
  Label: `
    relative flex flex-col gap-1 text-sm leading-5 font-bold
    text-[oklch(14.5%_0_0deg)]
    dark:text-white
  `,

  InputGroup: `
    relative h-8 w-56 border border-[oklch(14.5%_0_0deg)] bg-white
    focus-within:outline focus-within:outline-2
    focus-within:outline-[oklch(14.5%_0_0deg)]
    focus-within:[outline-offset:-1px]
    dark:border-white dark:bg-[oklch(14.5%_0_0deg)]
    dark:focus-within:outline-white
  `,

  Input: `
    m-0 h-full w-full border-0 rounded-none bg-white p-0 pl-2
    text-sm leading-5 font-normal text-[oklch(14.5%_0_0deg)]
    [font-family:inherit]
    placeholder:text-[oklch(55.6%_0_0deg)]
    focus:outline-none
    dark:bg-[oklch(14.5%_0_0deg)] dark:text-white
    dark:placeholder:text-[oklch(70.8%_0_0deg)]
    [@media(any-pointer:coarse)]:text-base
    [@media(any-pointer:coarse)]:leading-6
  `,

  ActionButtons: `
    absolute inset-y-0 right-0 flex items-center justify-center
    border-0 p-0 text-[oklch(55.6%_0_0deg)]
    dark:text-[oklch(70.8%_0_0deg)]
  `,

  IconButton: `
    flex h-full w-6 items-center justify-center border-0 bg-transparent p-0
    text-[oklch(14.5%_0_0deg)]
    dark:text-white
  `,

  Positioner: `
    [outline:0]
  `,

  Popup: `
    w-[var(--anchor-width)] max-w-[var(--available-width)]
    origin-[var(--transform-origin)]
    border border-[oklch(14.5%_0_0deg)] bg-white
    text-[oklch(14.5%_0_0deg)]
    shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.12)]
    transition-[opacity,transform,scale] duration-100
    dark:border-white dark:bg-[oklch(14.5%_0_0deg)] dark:text-white
    dark:shadow-none
    data-[starting-style]:opacity-0
    data-[starting-style]:[transform:scale(0.95)]
    data-[ending-style]:opacity-0
    data-[ending-style]:[transform:scale(0.95)]
  `,

  List: `
    max-h-[min(22.5rem,var(--available-height))]
    overflow-y-auto overscroll-contain py-1
    [scroll-padding-block:0.25rem]
    [outline:0]
    data-[empty]:p-0
  `,

  Item: `
    grid cursor-default select-none grid-cols-[1rem_1fr] items-center gap-2
    px-2 py-2 text-sm leading-4 [outline:0]
    data-[highlighted]:bg-[oklch(14.5%_0_0deg)]
    data-[highlighted]:text-white
    dark:data-[highlighted]:bg-white
    dark:data-[highlighted]:text-[oklch(14.5%_0_0deg)]
  `,

  ItemText: `
    col-start-2
  `,

  ItemIndicator: `
    col-start-1
  `,

  Empty: `
    py-4 pr-4 pl-2 text-sm leading-4 text-[oklch(55.6%_0_0deg)]
    dark:text-[oklch(70.8%_0_0deg)]
  `,
};

type ExampleComboboxProps = {
  showClear?: boolean;
};

export default function ExampleCombobox(props: ExampleComboboxProps) {
  return (
    <React.Suspense fallback={null}>
      <FruitCombobox {...props} />
    </React.Suspense>
  );
}

function FruitCombobox({ showClear = true }: ExampleComboboxProps) {
  const id = React.useId();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlFruit = searchParams.get("fruit");

  const [value, setValue] = React.useState<Fruit | null>(() => {
    return fruits.find((fruit) => fruit.value === urlFruit) ?? null;
  });

  React.useEffect(() => {
    setValue((current) => {
      if (current?.value === urlFruit) return current;
      if (current === null && urlFruit === null) return current;
      return fruits.find((fruit) => fruit.value === urlFruit) ?? null;
    });
  }, [urlFruit]);

  const handleValueChange = React.useCallback(
    (nextValue: Fruit | Fruit[] | null) => {
      const next = Array.isArray(nextValue) ? (nextValue[0] ?? null) : nextValue;

      setValue(next);

      const params = new URLSearchParams(searchParams.toString());

      if (next) {
        params.set("fruit", next.value);
      } else {
        params.delete("fruit");
      }

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return (
    <Combobox.Root items={fruits} value={value} onValueChange={handleValueChange}>
      <div className={ui.Label}>
        <label htmlFor={id}>Choose a fruit</label>

        <Combobox.InputGroup className={ui.InputGroup}>
          <Combobox.Input
            placeholder="e.g. Apple"
            id={id}
            className={`
              ${ui.Input}
              ${showClear ? "pr-18" : "pr-10"}
            `}
          />

          <div className={ui.ActionButtons}>
            {showClear && (
              <Combobox.Clear className={ui.IconButton} aria-label="Clear selection">
                <XIcon />
              </Combobox.Clear>
            )}

            <Combobox.Trigger className={ui.IconButton} aria-label="Open popup">
              <CaretDownIcon />
            </Combobox.Trigger>
          </div>
        </Combobox.InputGroup>
      </div>

      <Combobox.Portal>
        <Combobox.Positioner className={ui.Positioner} sideOffset={4}>
          <Combobox.Popup className={ui.Popup}>
            <Combobox.Empty>
              <div className={ui.Empty}>No fruits found.</div>
            </Combobox.Empty>

            <Combobox.List className={ui.List}>
              {(item: Fruit) => (
                <Combobox.Item key={item.value} value={item} className={ui.Item}>
                  <Combobox.ItemIndicator className={ui.ItemIndicator}>
                    <CheckIcon />
                  </Combobox.ItemIndicator>

                  <span className={ui.ItemText}>{item.label}</span>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m4.5 4.5 7 7m-7 0 7-7" />
    </svg>
  );
}

function CaretDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}
