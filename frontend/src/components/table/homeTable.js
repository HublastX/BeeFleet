import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "@/elements/ui/table";
import Badge from "@/elements/ui/badge/Badge";
import Icon from "@/elements/Icon";
const tableData = [
   {
      id: 1,
      motorista: "clebere",
      carro: "pjl5066",
      data: "14/01",
      status: "em uso",
   },
   {
      id: 2,
      motorista: "bruno",
      carro: "pjl5066",
      data: "20/08",
      status: "finalizado",
   },
   {
      id: 3,
      motorista: "cleberson",
      carro: "psdl5056",
      data: "15/04",
      status: "finalizado",
   },
];

export default function RecentEvent() {
   return (
      <div className="px-6 max-w-full overflow-x-auto overflow-hidden rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
         <h1 className="my-4 text-xl font-semibold text-gray-800 dark:text-white/90">
            Ultimos eventos
         </h1>

         <Table>
            <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
               <TableRow>
                  <TableCell
                     isHeader
                     className="py-3 font-medium text-gray-500 text-start dark:text-gray-400"
                  >
                     Motorista
                  </TableCell>
                  <TableCell
                     isHeader
                     className="py-3 font-medium text-gray-500 text-start  dark:text-gray-400"
                  >
                     Carro
                  </TableCell>
                  <TableCell
                     isHeader
                     className="hidden md:block py-3 font-medium text-gray-500 text-start dark:text-gray-400"
                  >
                     Data
                  </TableCell>
                  <TableCell
                     isHeader
                     className="py-3 text-right font-medium w-auto text-gray-500  dark:text-gray-400"
                  >
                     Status
                  </TableCell>
               </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-bee-dark-600 dark:text-bee-alert-500">
               {tableData.map((product) => (
                  <TableRow key={product.id} className="">
                     <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                           <Icon name="UserCircle" className="w-8 h-8 hidden md:block" />
                           <div>
                              <p>
                                 {product.motorista}
                              </p>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                           <Icon name="truck" className="w-8 h-8 hidden md:block" />
                           <div>
                              <p >
                                 {product.carro}
                              </p>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell className="py-3 hidden md:block">{product.data}</TableCell>
                     <TableCell className="py-3 text-right border-l border-bee-dark-300 dark:border-bee-dark-400">
                        <Badge
                           size="sm"
                           color={
                              product.status === "em uso" ? "error" : "success"
                           }
                        >
                           {product.status}
                        </Badge>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
