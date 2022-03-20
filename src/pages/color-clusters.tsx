import { useAppState } from '~/hooks/useAppState'

const Page: React.FC = () => {
  const { colors } = useAppState()

  return <section className="flex-1 p-4 gap-8 overflow-y-auto">Color Clusters</section>
}

export default Page
