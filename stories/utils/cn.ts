const cn = (...classes: Array<boolean | string | null> ): string => classes.filter(Boolean).join(" ")
export default cn
