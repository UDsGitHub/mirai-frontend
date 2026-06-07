import { CombinedSchemaType } from "@/components/multistep-form"
import { useFormContext } from "react-hook-form"

type Props = {}

export default function Step3({}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CombinedSchemaType>()

  return <div>Step3</div>
}
