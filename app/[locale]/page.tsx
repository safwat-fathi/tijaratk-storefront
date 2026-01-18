import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import {
	Truck,
	MapPin,
	ArrowRight,
	Play,
	Store,
	LayoutDashboard,
	BarChart3,
	CreditCard,
	Percent,
	Globe,
	Smartphone,
	Package,
	Users,
	ShoppingBag,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
	const t = await getTranslations("LandingPage");

	return (
		<main className="min-h-screen bg-white selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden">
			{/* Navbar */}
			<nav className="fixed top-0 inset-x-0 z-50 h-16 glass-panel border-b-0 rounded-none px-4 sm:px-8 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Image
						src="/logo.png"
						alt="Tijaratk Logo"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<span className="font-bold text-xl text-black tracking-tight hidden sm:block">
						{t("brandName")}
					</span>
				</div>
				<div className="flex items-center gap-4">
					<LocaleSwitcher className="px-3 py-1.5 text-sm font-medium text-black hover:bg-black/5 rounded-full transition-colors" />
					<Link
						href="/learn-more"
						className="hidden sm:inline-flex items-center justify-center rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-gray-900"
					>
						{t("Hero.secondaryCTA")}
					</Link>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-8 max-w-7xl mx-auto overflow-visible">
				{/* Background Blobs */}
				<div className="absolute top-20 left-0 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
				<div className="absolute top-20 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

				<div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Column: Copy + CTAs */}
					<div className="flex flex-col items-center lg:items-start text-center lg:text-start space-y-8 animate-fade-up">
						{/* Badges */}
						<div className="flex flex-wrap gap-2 justify-center lg:justify-start">
							<span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold border border-green-100">
								✨ {t("Hero.badgeReady")}
							</span>
							<span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
								💎 {t("Hero.badgeCommission")}
							</span>
						</div>

						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
							{t("Hero.headline")}
						</h1>

						<div className="space-y-4">
							<p className="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed">
								{t("Hero.subHeadline")}
							</p>
							<p className="text-lg text-gray-500 max-w-lg mx-auto lg:mx-0">
								{t("Hero.supportingLine")}
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
							<Link
								href="/signup"
								className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-base font-bold text-white shadow-xl shadow-gray-200 transition-all hover:bg-black hover:scale-105 active:scale-95"
							>
								{t("Hero.primaryCTA")}
								<ArrowRight className="w-5 h-5 rtl:rotate-180" />
							</Link>
							{/* <a
								href="#how-it-works"
								className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-md border border-gray-100 transition-all hover:bg-gray-50 hover:border-gray-200"
							>
								{t("Hero.secondaryCTA")}
							</a> */}
						</div>
					</div>

					{/* Right Column: Split Visual (Mobile Store + Dashboard) */}
					<div
						className="relative mx-auto w-full max-w-lg lg:max-w-none animate-fade-up"
						style={{ animationDelay: "0.2s" }}
					>
						<div className="relative w-full aspect-square lg:aspect-4/3">
							{/* Decoration */}
							<div className="absolute inset-0 bg-linear-to-tr from-violet-100 to-indigo-50 rounded-[3rem] -rotate-6 transform scale-95 opacity-50"></div>

							{/* Mobile Store Preview (Phone) */}
							<div className="absolute bottom-0 left-0 w-[45%] z-20 transform hover:-translate-y-2 transition-transform duration-500">
								<div className="relative rounded-4xl bg-gray-900 p-2 shadow-2xl">
									<div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-20"></div>
									<div className="rounded-[1.5rem] bg-white overflow-hidden aspect-[9/19] relative border border-gray-800">
										{/* Mock Store Content */}
										<div className="h-full bg-white flex flex-col relative overflow-hidden">
											{/* Top Bar */}
											<div className="h-10 bg-white border-b border-gray-100 flex items-center justify-between px-3 pt-4">
												<div className="w-4 h-4 rounded-full bg-gray-100"></div>
												<div className="w-16 h-2 rounded-full bg-gray-100"></div>
											</div>
											{/* Store Logo & Content */}
											<div className="flex-1 p-3 flex flex-col gap-3">
												{/* Banner */}
												<div className="w-full h-24 rounded-xl bg-gray-50 flex items-center justify-center relative overflow-hidden group">
													<div className="absolute inset-0 bg-linear-to-tr from-violet-500/10 to-blue-500/10"></div>
													<Image
														src="/logo-no-bg.png"
														alt="Tijaratk Store"
														width={80}
														height={80}
														className="drop-shadow-sm transform group-hover:scale-110 transition-transform duration-500"
													/>
												</div>
												{/* Products Grid */}
												<div className="grid grid-cols-2 gap-2">
													{[1, 2, 3, 4].map(i => (
														<div
															key={i}
															className="aspect-[3/4] rounded-lg bg-gray-50 border border-gray-100 relative overflow-hidden"
														>
															<div className="absolute bottom-2 left-2 w-8 h-2 rounded-full bg-gray-200"></div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Seller Dashboard Preview (Desktop/Tablet Card) */}
							<div className="absolute top-8 right-0 w-[75%] z-10 transform hover:translate-y-2 transition-transform duration-500">
								<div className="rounded-2xl bg-white shadow-2xl border border-gray-100 p-4 aspect-[4/3] flex flex-col">
									<div className="flex gap-2 mb-4 border-b border-gray-50 pb-2">
										<div className="w-3 h-3 rounded-full bg-red-400"></div>
										<div className="w-3 h-3 rounded-full bg-yellow-400"></div>
										<div className="w-3 h-3 rounded-full bg-green-400"></div>
									</div>
									<div className="flex-1 space-y-4 p-2">
										{/* Stats Row */}
										<div className="grid grid-cols-3 gap-3">
											<div className="rounded-xl bg-green-50/50 border border-green-100 p-3">
												<div className="text-xs text-gray-500 mb-1">
													Total Sales
												</div>
												<div className="text-lg font-bold text-green-700">
													12,450
												</div>
											</div>
											<div className="rounded-xl bg-blue-50/50 border border-blue-100 p-3">
												<div className="text-xs text-gray-500 mb-1">
													Active Orders
												</div>
												<div className="text-lg font-bold text-blue-700">8</div>
											</div>
											<div className="rounded-xl bg-violet-50/50 border border-violet-100 p-3">
												<div className="text-xs text-gray-500 mb-1">
													Products
												</div>
												<div className="text-lg font-bold text-violet-700">
													24
												</div>
											</div>
										</div>

										{/* Recent Orders List Mockup */}
										<div className="flex-1 rounded-xl border border-gray-100 overflow-hidden flex flex-col">
											<div className="bg-gray-50/80 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
												<span className="text-xs font-semibold text-gray-700">
													Recent Activity
												</span>
											</div>
											<div className="divide-y divide-gray-50 bg-white p-2">
												{[1, 2, 3].map(i => (
													<div
														key={i}
														className="flex items-center justify-between py-2"
													>
														<div className="flex items-center gap-3">
															<div className="w-8 h-8 rounded-full bg-gray-100"></div>
															<div className="space-y-1">
																<div className="w-16 h-2 rounded-full bg-gray-200"></div>
																<div className="w-10 h-1.5 rounded-full bg-gray-100"></div>
															</div>
														</div>
														<div className="w-12 h-5 rounded-full bg-green-50"></div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Problem Section (Pain Points) */}
			<section className="py-24 bg-gray-50/50">
				<div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
						{t("Problem.title")}
					</h2>

					<div className="bg-white rounded-4xl p-8 md:p-12 shadow-xl shadow-gray-100/50 border border-gray-100">
						<ul className="space-y-4 text-left inline-block mx-auto">
							{t.raw("Problem.list").map((item: string, index: number) => (
								<li
									key={index}
									className="flex items-center gap-4 text-lg md:text-xl text-gray-700 font-medium"
								>
									<span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">
										✕
									</span>
									{item}
								</li>
							))}
						</ul>
						<p className="text-xl text-gray-900 font-bold mt-10 pt-8 border-t border-gray-50">
							{t("Problem.conclusion")}
						</p>
					</div>
				</div>
			</section>

			{/* Solution Section */}
			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8">
					<div className="text-center mb-16 max-w-3xl mx-auto animate-fade-up">
						<span className="text-violet-600 font-bold tracking-wider uppercase text-2xl mb-4 block">
							{t("Solution.label")}
						</span>
						<h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
							{t("Solution.title")}
						</h2>
						<p className="text-xl text-gray-600 leading-relaxed font-medium">
							{t("Solution.prefix")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 mb-16">
						{[
							{
								key: "shop",
								icon: Globe,
								bg: "bg-blue-50",
								text: "text-blue-600",
								border: "border-blue-100",
							},
							{
								key: "dashboard",
								icon: LayoutDashboard,
								bg: "bg-violet-50",
								text: "text-violet-600",
								border: "border-violet-100",
							},
							{
								key: "analytics",
								icon: BarChart3,
								bg: "bg-emerald-50",
								text: "text-emerald-600",
								border: "border-emerald-100",
							},
						].map((item, i) => (
							<div
								key={item.key}
								className={`flex flex-col items-center text-center p-10 rounded-4xl ${item.bg} border ${item.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
							>
								<div
									className={`w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
								>
									<item.icon className={`w-10 h-10 ${item.text}`} />
								</div>
								<h3 className="text-2xl font-bold text-gray-900 leading-snug">
									{t(`Solution.list.${item.key}`)}
								</h3>
							</div>
						))}
					</div>

					<div className="text-center">
						<p className="text-2xl font-bold text-gray-900 bg-gray-50 inline-block px-8 py-4 rounded-full border border-gray-100 shadow-sm">
							{t("Solution.conclusion")}
						</p>
					</div>
				</div>
			</section>

			{/* Features Grid - Dashboard First */}
			<section className="py-24 bg-gray-900 text-white overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-8">
					<div className="grid gap-24">
						{/* Feature 1: Online Store */}
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<div className="order-2 lg:order-1 relative">
								<div className="absolute inset-0 bg-linear-to-r from-violet-500/30 to-blue-500/30 blur-3xl rounded-full"></div>
								<div className="relative glass-panel bg-white/5 border-white/10 p-6 rounded-4xl backdrop-blur-sm">
									{/* Abstract Store UI */}
									<div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden aspect-video relative group">
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="text-center space-y-4">
												<div className="w-16 h-16 bg-violet-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-violet-900/50 group-hover:scale-110 transition-transform">
													<Store className="w-8 h-8 text-white" />
												</div>
												<div className="px-4 py-2 bg-gray-800 rounded-lg text-sm font-medium text-gray-300 border border-gray-700">
													tijaratk.com/your-store
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="order-1 lg:order-2 space-y-6">
								<div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
									<Smartphone className="w-8 h-8 text-violet-400" />
								</div>
								<h3 className="text-4xl font-bold">
									{t("Features.store.title")}
								</h3>
								<p className="text-xl text-gray-400 leading-relaxed">
									{t("Features.store.description")}
								</p>
							</div>
						</div>

						{/* Feature 2: Dashboard */}
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<div className="space-y-6">
								<div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
									<LayoutDashboard className="w-8 h-8 text-blue-400" />
								</div>
								<h3 className="text-4xl font-bold">
									{t("Features.dashboard.title")}
								</h3>
								<p className="text-xl text-gray-400 leading-relaxed">
									{t("Features.dashboard.description")}
								</p>
							</div>
							<div className="relative">
								<div className="absolute inset-0 bg-linear-to-l from-blue-500/30 to-cyan-500/30 blur-3xl rounded-full"></div>
								<div className="relative glass-panel bg-white/5 border-white/10 p-6 rounded-4xl backdrop-blur-sm">
									{/* Abstract Dashboard UI */}
									<div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
										<div className="flex gap-4 border-b border-gray-800 pb-4">
											<div className="w-1/3 h-20 bg-gray-800 rounded-lg animate-pulse"></div>
											<div className="w-1/3 h-20 bg-gray-800 rounded-lg animate-pulse delay-75"></div>
											<div className="w-1/3 h-20 bg-gray-800 rounded-lg animate-pulse delay-150"></div>
										</div>
										<div className="space-y-3">
											{[1, 2, 3].map(i => (
												<div
													key={i}
													className="h-12 bg-gray-800/50 rounded-lg w-full"
												></div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Feature 3: Analytics */}
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<div className="order-2 lg:order-1 relative">
								<div className="absolute inset-0 bg-linear-to-r from-emerald-500/30 to-teal-500/30 blur-3xl rounded-full"></div>
								<div className="relative glass-panel bg-white/5 border-white/10 p-6 rounded-4xl backdrop-blur-sm">
									{/* Abstract Chart UI */}
									<div className="bg-gray-900 rounded-xl border border-gray-800 p-6 flex items-end justify-between gap-4 h-64">
										{[40, 70, 45, 90, 60, 80, 95].map((h, i) => (
											<div
												key={i}
												className="w-full bg-emerald-500/80 rounded-t-lg hover:bg-emerald-400 transition-colors"
												style={{ height: `${h}%` }}
											></div>
										))}
									</div>
								</div>
							</div>
							<div className="order-1 lg:order-2 space-y-6">
								<div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
									<BarChart3 className="w-8 h-8 text-emerald-400" />
								</div>
								<h3 className="text-4xl font-bold">
									{t("Features.analytics.title")}
								</h3>
								<p className="text-xl text-gray-400 leading-relaxed">
									{t("Features.analytics.description")}
								</p>
							</div>
						</div>

						{/* Feature 4: Zero Commission */}
						<div className="bg-linear-to-br from-violet-600 to-indigo-600 rounded-4xl p-12 md:p-20 text-center relative overflow-hidden">
							<div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
							<div className="relative z-10 max-w-3xl mx-auto space-y-8">
								<div className="flex justify-center">
									<div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
										<Percent className="w-12 h-12 text-white" />
									</div>
								</div>
								<h3 className="text-4xl md:text-6xl font-black tracking-tight">
									{t("Features.commission.title")}
								</h3>
								<p className="text-2xl md:text-3xl text-violet-100 font-medium">
									{t("Features.commission.description")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Dashboard Preview Section */}
			<section className="py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
					<div className="max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
							{t("DashboardPreview.title")}
						</h2>
						<div className="flex flex-wrap justify-center gap-4 text-gray-600">
							{t.raw("DashboardPreview.list").map((item: string, i: number) => (
								<span
									key={i}
									className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-sm font-medium"
								>
									<div className="w-2 h-2 rounded-full bg-violet-500"></div>
									{item}
								</span>
							))}
						</div>
					</div>

					{/* Dashboard Visual */}
					<div className="relative max-w-5xl mx-auto">
						<div className="absolute inset-0 bg-linear-to-t from-gray-50 via-transparent to-transparent z-10"></div>
						<div className="rounded-4xl bg-white border border-gray-200 shadow-2xl overflow-hidden">
							{/* Header */}
							<div className="border-b border-gray-100 p-4 flex items-center justify-between bg-gray-50/50">
								<div className="flex gap-2">
									<div className="w-3 h-3 rounded-full bg-red-400"></div>
									<div className="w-3 h-3 rounded-full bg-yellow-400"></div>
									<div className="w-3 h-3 rounded-full bg-green-400"></div>
								</div>
								<div className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-500">
									admin.tijaratk.com
								</div>
							</div>

							{/* Dashboard Content */}
							<div className="p-6 md:p-8 text-left bg-white min-h-[500px]">
								{/* Dashboard Header */}
								<div className="mb-8">
									<h3 className="text-2xl font-bold text-gray-900">
										{t("DashboardPreview.mock.welcome")}
									</h3>
									<p className="text-gray-500">
										{t("DashboardPreview.mock.subtitle")}
									</p>
								</div>

								{/* Stats Row */}
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
									{/* Total Products */}
									<div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
										<div className="mb-4 text-gray-400">
											<Package className="w-6 h-6" />
										</div>
										<div className="text-sm font-medium text-gray-500 mb-1">
											{t("DashboardPreview.mock.totalProducts")}
										</div>
										<div className="text-2xl font-bold text-gray-900">120</div>
									</div>
									{/* Store Visits */}
									<div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
										<div className="mb-4 text-gray-400">
											<Users className="w-6 h-6" />
										</div>
										<div className="text-sm font-medium text-gray-500 mb-1">
											{t("DashboardPreview.mock.storeVisits")}
										</div>
										<div className="text-2xl font-bold text-gray-900">
											25000
										</div>
									</div>
									{/* Total Completed Orders */}
									<div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
										<div className="mb-4 text-gray-400">
											<ShoppingBag className="w-6 h-6" />
										</div>
										<div className="text-sm font-medium text-gray-500 mb-1">
											{t("DashboardPreview.mock.totalOrders")}
										</div>
										<div className="text-2xl font-bold text-gray-900">1500</div>
									</div>
									{/* Total Sales */}
									<div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
										<div className="mb-4 text-gray-400">
											<CreditCard className="w-6 h-6" />
										</div>
										<div className="text-sm font-medium text-gray-500 mb-1">
											{t("DashboardPreview.mock.totalSales")}
										</div>
										<div className="text-2xl font-bold text-gray-900">
											65000
										</div>
									</div>
								</div>

								{/* Charts Row */}
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									{/* Orders Overview */}
									<div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white h-full min-h-[300px] flex flex-col hover:shadow-md transition-shadow">
										<h4 className="text-lg font-semibold text-gray-900 mb-8">
											{t("DashboardPreview.mock.ordersOverview")}
										</h4>
										<div className="flex-1 px-4 pb-4 relative border-l border-b border-gray-50 border-dashed min-h-[200px]">
											{/* Grid Lines */}
											<div className="w-full h-px bg-gray-50 absolute top-1/4 left-0"></div>
											<div className="w-full h-px bg-gray-50 absolute top-1/2 left-0"></div>
											<div className="w-full h-px bg-gray-50 absolute top-3/4 left-0"></div>

											{/* Axis Labels */}
											<div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-300 py-4">
												<span>100</span>
												<span>50</span>
												<span>0</span>
											</div>

											{/* Line Chart SVG */}
											<div className="absolute inset-0 px-4 pb-4 pt-8">
												<svg
													className="w-full h-full overflow-visible"
													viewBox="0 0 100 100"
													preserveAspectRatio="none"
												>
													<defs>
														<linearGradient
															id="lineGradient"
															x1="0"
															y1="0"
															x2="0"
															y2="1"
														>
															<stop
																offset="0%"
																stopColor="#4f46e5"
																stopOpacity="0.2"
															/>
															<stop
																offset="100%"
																stopColor="#4f46e5"
																stopOpacity="0"
															/>
														</linearGradient>
													</defs>
													{/* Area */}
													<path
														d="M0,80 C10,75 20,60 30,65 C40,70 50,40 60,45 C70,50 80,20 90,25 C95,28 100,20 100,20 V100 H0 Z"
														fill="url(#lineGradient)"
													/>
													{/* Line */}
													<path
														d="M0,80 C10,75 20,60 30,65 C40,70 50,40 60,45 C70,50 80,20 90,25 C95,28 100,20 100,20"
														fill="none"
														stroke="#4f46e5"
														strokeWidth="2"
														vectorEffect="non-scaling-stroke"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													{/* Dots */}
													<circle cx="0" cy="80" r="1.5" fill="#4f46e5" />
													<circle cx="30" cy="65" r="1.5" fill="#4f46e5" />
													<circle cx="60" cy="45" r="1.5" fill="#4f46e5" />
													<circle cx="90" cy="25" r="1.5" fill="#4f46e5" />
												</svg>
											</div>

											{/* X Axis Labels */}
											<div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-xs text-gray-400 font-medium px-2">
												<span>Jan</span>
												<span>Feb</span>
												<span>Mar</span>
												<span>Apr</span>
											</div>
										</div>
									</div>

									{/* Quarterly Performance */}
									<div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white h-full min-h-[300px] flex flex-col hover:shadow-md transition-shadow">
										<h4 className="text-lg font-semibold text-gray-900 mb-8">
											{t("DashboardPreview.mock.quarterlyPerformance")}
										</h4>
										<div className="flex-1 flex items-end justify-around px-4 border-l border-b border-gray-50 border-dashed pb-4 pl-4 relative min-h-[200px]">
											{/* Bars */}
											<div className="w-8 bg-linear-to-t from-gray-600 to-gray-900 rounded-t-sm h-[65%] relative group shadow-lg transition-all hover:h-[70%]">
												<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
													Q1
												</div>
											</div>
											<div className="w-8 bg-linear-to-t from-gray-600 to-gray-900 rounded-t-sm h-[40%] relative group shadow-lg transition-all hover:h-[45%]">
												<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
													Q2
												</div>
											</div>
											<div className="w-8 bg-linear-to-t from-gray-600 to-gray-900 rounded-t-sm h-[85%] relative group shadow-lg transition-all hover:h-[90%]">
												<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
													Q3
												</div>
											</div>
											<div className="w-8 bg-linear-to-t from-gray-600 to-gray-900 rounded-t-sm h-[55%] relative group shadow-lg transition-all hover:h-[60%]">
												<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
													Q4
												</div>
											</div>
										</div>
										<div className="flex justify-center gap-6 mt-8">
											<div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
												<div className="w-2 h-2 rounded-full bg-gray-900"></div>
												{t("DashboardPreview.mock.completed")}
											</div>
											<div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
												<div className="w-2 h-2 rounded-full bg-red-400"></div>
												{t("DashboardPreview.mock.cancelled")}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Who is Tijaratk For */}
			<section className="py-24 bg-white border-t border-gray-100">
				<div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
						{t("WhoFor.title")}
					</h2>
					<div className="flex flex-wrap justify-center gap-4 mb-4">
						{t.raw("WhoFor.list").map((item: string, i: number) => (
							<span
								key={i}
								className="px-8 py-4 rounded-2xl bg-gray-50 text-gray-900 border border-gray-100 font-bold text-lg md:text-xl shadow-sm hover:scale-105 transition-transform cursor-default"
							>
								{item}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Teaser */}
			<section className="py-24 bg-gray-900 text-white overflow-hidden relative">
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
				<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

				<div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10">
					<div className="glass-panel bg-linear-to-br from-violet-50 to-indigo-50 p-12 md:p-20 rounded-[3rem]">
						<h2 className="text-5xl md:text-7xl font-black text-violet-700 mb-6 tracking-tight">
							{t("Pricing.teaser")}
						</h2>
						<p className="text-2xl md:text-3xl text-gray-400 font-medium">
							{t("Pricing.subTeaser")}
						</p>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-32 relative bg-white overflow-hidden">
				<div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10">
					<h2 className="text-5xl md:text-7xl font-black mb-8 text-gray-900 tracking-tighter leading-[1.1]">
						{t("FinalCTA.title")}
					</h2>
					<p className="text-2xl text-gray-500 mb-12 font-medium">
						{t("FinalCTA.subTitle")}
					</p>
					<div className="flex flex-col items-center gap-6">
						<Link
							href="/signup"
							className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-all shadow-2xl hover:scale-105 transform duration-200"
						>
							{t("FinalCTA.button")}
						</Link>
						<span className="text-gray-400 font-medium">
							{t("FinalCTA.buttonSub")}
						</span>
					</div>
				</div>
			</section>

			{/* Footer (Simplified) */}
			<footer className="py-12 bg-gray-900 text-gray-400 text-center border-t border-gray-800">
				<div className="flex items-center justify-center gap-2 mb-4">
					{/* <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-white font-bold text-xs">
						T
					</div> */}
					<Image
						src="/logo-no-bg.png"
						alt="Tijaratk Logo"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<span className="font-semibold text-white">{t("brandName")}</span>
				</div>
				<p>
					© {new Date().getFullYear()} {t("Footer.copyright")}
				</p>
			</footer>
		</main>
	);
}
