'use client'
import * as yup from 'yup'
import { Button } from 'components/common/buttons/Button'
import { TextInput } from 'components/common/inputs/TextInput'
import OnboardingFooter from 'components/onboarding/OnboardingFooter'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useAuthApi, LoginFormValues } from 'lib/api/auth'
import Image from 'next/image'
import Link from 'next/link'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least one letter, one number, and one special character'
    )
})

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const { handleLogin, data, status } = useAuthApi()

  const onSubmit = (data: LoginFormValues) => {
    handleLogin(data)
  }

  return (
    <main>
      <nav className="h-[100px] w-full py-6 flex items-center justify-between px-14">
        <Link href="/" className="block w-64">
          <Image
            src="/assets/images/snaphomz-logo.svg"
            alt="logo"
            height={60}
            width={200}
          />
        </Link>
      </nav>
      <section className="flex flex-wrap h-[calc(100vh-100px)]">
        <section className="md:w-1/2 max-h-full relative overflow-hidden">
          <img src="/assets/images/signupHero.svg" alt="hero" />
          {/* <Image
            src="/assets/images/signupHero.svg"
            alt="hero"
            fill
            className="absolute w-auto h-full object-cover"
          /> */}
        </section>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-1/2  align-center justify-center pl-20 flex flex-col">
          <section className="md:w-10/12">
            <p className="text-black font-medium text-4xl mb-20">Login</p>

            <TextInput
              label="E-mail address"
              className="border-b mb-10"
              type="email"
              name="email"
              error={errors['email']}
              register={register}
            />
            <TextInput
              label="Password"
              className="border-b"
              type="password"
              name="password"
              error={errors['password']}
              register={register}
            />

            <Button
              className="text-white bg-black font-semibold text-lg mt-20"
              type="submit"
              loading={status === 'pending'}>
              Continue
            </Button>

            <OnboardingFooter
              message="Don’t have an account?"
              actionText="SignUp"
              actionLink="/signUp"
            />
          </section>
        </form>
      </section>
    </main>
  )
}
export default LoginPage
