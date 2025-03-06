import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/HomeComponent')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/HomeComponent"!</div>
}
