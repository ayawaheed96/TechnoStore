import { Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type TBread ={
    children?:string[]
}

export function BreadCrumb({children}:TBread) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        { children &&
            <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        }
        {
            children && children.length>0 && 
            <>
            {
                children.map(com =>(
                    <BreadcrumbItem key={com}>
                        <BreadcrumbLink href={`/${com}`}className="capitalize">{com}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))
            }
            </>
        }
        {/* <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
