import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Combobox } from '@/components/ui/combobox'
import { CalendarIcon, User2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { formatDate } from '@/lib/format'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import Switcher3 from '@/components/switch'
import ICustomer from '@/models/customer'
import customerService from '@/services/customer-service'
import { useToast } from '@/components/ui/use-toast'
const formSchema = z.object({
  organizationName: z.string(),
  identityDate: z.date(),
  identityNumber: z.string(),
  identityPlace: z.string(),
  city: z.string(),
  rePresentativeName: z.string(),
  roles: z.string(),
  perOrgName: z.string(),
  address: z.string(),
  engName: z.string(),
  engAddress: z.string(),
  phone: z.string(),
  fax: z.string(),
  email: z.string(),
  emailReceipt: z.string(),
  accountName: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  nationalAccountName: z.string(),
  nationalPassword: z.string(),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
})

const Register = () => {
  const { toast } = useToast()
  const options = [
    { label: 'Hà Nội', value: '0' },
    { label: 'Hải Phòng', value: '1' },
    { label: 'Thành phố Hồ Chí Minh', value: '2' },
    { label: 'Đà Nẵng', value: '3' },
  ]

  const items = [
    {
      id: 'import',
      label: 'Kiểm dịch thực vật nhập khẩu',
    },
    {
      id: 'export',
      label: 'Kiểm dịch thực vật xuất khẩu, tái xuất',
    },
  ] as const

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: '',
      identityNumber: '',
      identityPlace: '',
      identityDate: new Date('1900-01-01'),
      city: '',
      engAddress: '',
      engName: '',
      fax: '',
      emailReceipt: '',
      accountName: '',
      nationalAccountName: '',
      nationalPassword: '',
      items: ['import', 'export'],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data: ICustomer = {
      lon_user_name: values.nationalAccountName,
      lon_login_password: values.nationalPassword,
      lon_login_name: values.nationalPassword,
    }

    customerService
      .create(data)
      .then((response: any) => {
        if (response.data) {
          toast({
            variant: 'destructive',
            title: 'Thành công',
            description: 'Đăng kí tài khoản thành công',
          })
        }
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  return (
    <div
      className="h-full flex justify-center bg-center  px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover items-center"
      style={{
        backgroundImage: `url("https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg")`,
      }}
    >
      <div className="max-w-3xl w-full p-10 bg-white rounded-xl shadow-lg z-10 m-auto flex flex-col mt-8 mb-8">
        <h2 className="font-semibold text-lg text-center">
          PQS - Đăng ký tài khoản {'('}Tổ chức / cá nhân{')'}
        </h2>
        <div className="flex text-sm italic text-red-500 mt-4">
          <p>Ghi chú:</p>
          <div className="flex flex-col ml-1">
            <p>
              - Đăng ký tài khoản cá nhân chụp CMT hoặc CCCD gửi đến
              zalo:0912471508
            </p>
            <p>
              - Đăng ký tài khoản cá nhân dưới danh nghĩa tổ chức {'('}công ty,
              doanh nghiệp{')'} sẽ bị khoá tài khoản
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <fieldset className="flex border border-solid border-sky-300 p-3 mt-5 rounded-md">
              <legend className="text-sm bg-sky-200 p-1 rounded-md">
                ĐIỀN THÔNG TIN
              </legend>
              <div className="flex flex-col w-full">
                <div className="flex">
                  <div className="basis-1/3 mr-3">
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên tổ chức</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-2/3">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thuộc tỉnh / thành phố</FormLabel>
                          <FormControl>
                            <Combobox options={options} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row mt-2">
                  <div className="basis-1/3 mr-3">
                    {' '}
                    <FormField
                      control={form.control}
                      name="identityNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số CMT / Căn cước</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-1/3 mr-3">
                    <FormField
                      control={form.control}
                      name="identityDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col mt-[0.4rem]">
                          <FormLabel className="mb-[0.2rem]">
                            Ngày cấp
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value != new Date('1900-01-01') ? (
                                    formatDate(field.value, 'en-GB')
                                  ) : (
                                    <span>Chọn ngày</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-1/3">
                    {' '}
                    <FormField
                      control={form.control}
                      name="identityPlace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nơi cấp</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="flex border border-solid border-sky-300 p-3 mt-10 rounded-md">
              <legend className="text-sm bg-sky-200 p-1 rounded-md">
                THÔNG TIN TỔ CHỨC / CÁ NHÂN
              </legend>
              <div className="flex flex-col w-full">
                <div className="flex">
                  <div className="basis-1/2 mr-3">
                    <FormField
                      control={form.control}
                      name="rePresentativeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn('mr-1')}>
                            Người đại diện pháp luật
                          </FormLabel>
                          <abbr title="required" className="text-red-500">
                            *
                          </abbr>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="roles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn('mr-1')}>Chức vụ</FormLabel>
                          <abbr title="required" className="text-red-500">
                            *
                          </abbr>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="perOrgName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn('mr-1')}>
                          Tên tổ chức / cá nhân
                        </FormLabel>
                        <abbr title="required" className="text-red-500">
                          *
                        </abbr>
                        <FormControl>
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn('mr-1')}>Địa chỉ</FormLabel>
                        <abbr title="required" className="text-red-500">
                          *
                        </abbr>
                        <FormControl>
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="engName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên tiếng Anh</FormLabel>
                        <FormControl>
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="engAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ tiếng Anh</FormLabel>
                        <FormControl>
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex mt-2">
                  <div className="basis-1/2 mr-3">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn('mr-1')}>
                            Điện thoại
                          </FormLabel>
                          <abbr title="required" className="text-red-500">
                            *
                          </abbr>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="fax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fax</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex mt-2">
                  <div className="basis-1/2 mr-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn('mr-1')}>
                            Email đăng ký
                          </FormLabel>
                          <abbr title="required" className="text-red-500">
                            *
                          </abbr>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="emailReceipt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email nhận hoá đơn</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="flex border border-solid border-sky-300 p-3 mt-10 rounded-md">
              <legend className="text-sm bg-sky-200 p-1 rounded-md">
                MẬT KHẨU ĐĂNG NHẬP VÀO HỆ THỐNG
              </legend>
              <div className="flex flex-row w-full items-center">
                <div className="basis-1/3 mr-[150px] ">
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn('mr-1')}>
                          Tên tài khoản
                        </FormLabel>

                        <FormControl>
                          <Input disabled {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-col basis-1/2">
                  <div className="basis-1/3 mr-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn('mr-1')}>Mật khẩu</FormLabel>
                          <abbr title="required" className="text-red-500">
                            *
                          </abbr>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-2/3">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn('mr-1')}>
                            Nhập lại mật khẩu
                          </FormLabel>
                          <abbr title="required" className="text-red-500">
                            *
                          </abbr>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="flex">
              <fieldset className="flex basis-1/2 mr-3 border border-solid border-sky-300 p-5 rounded-md">
                <legend className="text-sm bg-sky-200 p-1 rounded-md">
                  KHAI BÁO THỦ TỤC
                </legend>
                <div className="flex flex-col w-full">
                  {' '}
                  <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                      <FormItem>
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id,
                                              ),
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </fieldset>

              <fieldset className="flex basis-1/2 border border-solid border-sky-300 p-3 rounded-md">
                <legend className="text-sm  bg-sky-200 p-1 rounded-md">
                  TÀI KHOẢN TRÊN MỘT CỬA QUỐC GIA
                </legend>
                <div className="flex flex-col w-full">
                  <div>
                    <FormField
                      control={form.control}
                      name="nationalAccountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn('mr-1')}>
                            Tên đăng nhập
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex mt-2 mr-15 items-center">
                    <div className="basis-4/5">
                      <FormField
                        control={form.control}
                        name="nationalPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn('mr-1')}>
                              Mật khẩu
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="ml-2 pt-8 basis-1/5">
                      <Switcher3 />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="flex">
              <div className="flex basis-1/4 justify-end">
                <button
                  type="submit"
                  className="text-white bg-green-400 hover:bg-green-500 border border-gray-200 focus:ring-4 focus:outline-none  focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                >
                  <User2 />
                  <span className="ml-2">Đăng ký</span>
                </button>
              </div>
              <div className="flex basis-3/4 items-center pb-2">
                <span className="text-sm italic text-red-500">
                  Ghi chú: Hồ sơ của tổ chức / cá nhân đã tồn tại trong hệ thống
                  thì nút Đăng ký sẽ bị mờ !
                </span>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Register
