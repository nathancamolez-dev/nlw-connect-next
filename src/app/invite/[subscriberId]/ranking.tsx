import { getRanking } from '@/http/api'
import Image from 'next/image'
import cooper from '../../../assets/medal-cooper.svg'
import gold from '../../../assets/medal-gold.svg'
import silver from '../../../assets/medal-silver.svg'

export async function Ranking() {
  const { ranking } = await getRanking()
  return (
    <div className="w-full max-w-[440px] space-y-5">
      {ranking.map((item, index) => {
        return (
          <div
            key={index}
            className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3"
          >
            <span className="text-sm text-gray-300 leading-none">
              <span className="font-semibold">{index + 1}º</span> {item.name}
            </span>
            <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
              {item.position}
            </span>

            <Image
              src={index === 0 ? gold : index === 1 ? silver : cooper}
              alt=""
              className="absolute top-0 right-8"
            />
          </div>
        )
      })}
    </div>
  )
}
