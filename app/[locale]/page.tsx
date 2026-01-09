import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import {
	X,
	Store,
	RefreshCw,
	MessageCircle,
	MapPin,
	ArrowRight,
	Play,
	ShoppingBag,
	Truck,
	Barcode,
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
			<section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
				{/* Background Blobs */}
				<div className="absolute top-20 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
				<div className="absolute top-20 right-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

				<div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
					<div className="flex flex-col items-center lg:items-start text-center lg:text-start space-y-6 animate-fade-up">
						<span className="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-sm font-semibold mb-2 border border-violet-100">
							{t("Hero.subHeadline")}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
							{t("Hero.headline")
								.split("—")
								.map((part, i) =>
									i === 0 ? (
										part
									) : (
										<span key={i} className="text-gradient block mt-2">
											{part}
										</span>
									)
								)}
						</h1>
						<p className="text-lg text-gray-600 max-w-xl leading-relaxed">
							{t("Hero.supportingLine")}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
							<Link
								href="/signup"
								className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-gray-200 transition-all hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1"
							>
								{t("Hero.primaryCTA")}
								<ArrowRight className="w-5 h-5 rtl:rotate-180" />
							</Link>
							<a
								href="#video-showcase"
								className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-gray-900 shadow-lg border border-gray-200 transition-all hover:bg-gray-50 hover:border-gray-300"
							>
								<Play className="w-5 h-5 fill-current" />
								{t("Hero.secondaryCTA")}
							</a>
						</div>
					</div>

					{/* Hero Visual - Mockup */}
					<div
						className="relative mx-auto lg:ml-auto w-full max-w-md animate-fade-up"
						style={{ animationDelay: "0.2s" }}
					>
						<div className="relative rounded-[2.5rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden aspect-[9/19]">
							<div className="absolute top-0 w-full h-8 bg-gray-900 z-20 rounded-t-[2rem] flex justify-center">
								<div className="w-32 h-6 bg-black rounded-b-xl"></div>
							</div>
							<div className="w-full h-full bg-gray-50 pt-10 pb-4 px-4 overflow-hidden relative">
								{/* Mockup Content */}
								<div className="flex justify-between items-center mb-6">
									<div className="h-8 w-8 rounded-full bg-gray-200"></div>
									<div className="h-4 w-24 bg-gray-200 rounded"></div>
								</div>
								<div className="space-y-4">
									<div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
										<div className="flex gap-4">
											<div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
												<Barcode className="w-8 h-8 text-gray-400 opactiy-50" />
											</div>
											<div className="space-y-2 flex-1">
												<div className="h-4 w-3/4 bg-gray-100 rounded"></div>
												<div className="h-3 w-1/2 bg-gray-100 rounded"></div>
											</div>
										</div>
									</div>
									<div className="p-4 rounded-2xl bg-violet-50 border border-violet-100">
										<div className="flex items-center gap-3 mb-2">
											<MessageCircle className="w-5 h-5 text-violet-600" />
											<span className="text-xs font-bold text-violet-800 uppercase tracking-wider">
												New Order
											</span>
										</div>
										<div className="text-sm font-medium text-gray-800">
											2x iPhone 15 Pro Max
										</div>
										<div className="text-xs text-gray-500 mt-1">
											Via WhatsApp • Just now
										</div>
									</div>
									<div className="h-32 rounded-2xl bg-gray-100 animate-pulse"></div>
								</div>

								{/* Floating Elements */}
								<div
									className="absolute bottom-12 -left-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce"
									style={{ animationDuration: "3s" }}
								>
									<div className="bg-green-100 p-2 rounded-lg text-green-600">
										<ShoppingBag className="w-5 h-5" />
									</div>
									<div>
										<div className="text-xs text-gray-400">Total Sales</div>
										<div className="font-bold text-gray-900">$1,240.00</div>
									</div>
								</div>
							</div>
						</div>
						{/* Glow */}
						<div className="absolute -inset-4 bg-gradient-to-tr from-violet-500 to-indigo-500 blur-2xl opacity-20 -z-10 rounded-[3rem]"></div>
					</div>
				</div>
			</section>

			{/* Problem Section (Pain Points) */}
			<section className="py-20 bg-gray-50/80">
				<div className="max-w-4xl mx-auto px-4 sm:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							{t("Problem.title")}
						</h2>
						<p className="text-lg text-gray-600">{t("Problem.conclusion")}</p>
					</div>

					<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
						<ul className="space-y-6">
							{Object.entries(t.raw("Problem.list")).map(([key, value]) => (
								<li
									key={key}
									className="flex items-start gap-4 p-4 rounded-xl hover:bg-red-50/50 transition-colors group"
								>
									<div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-200 transition-colors">
										<X className="w-5 h-5" />
									</div>
									<span className="text-lg text-gray-700 font-medium pt-1">
										{value as string}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* Solution Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8">
					<div className="text-center mb-16 max-w-3xl mx-auto">
						<span className="text-violet-600 font-bold tracking-wider uppercase text-sm mb-2 block">
							{t("Solution.label")}
						</span>
						<h2 className="text-4xl font-bold text-gray-900 mb-6">
							{t("Solution.title")}
						</h2>
						<p className="text-xl text-gray-600 leading-relaxed">
							{t("Solution.prefix")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 mb-12">
						{[
							{ key: "shop", icon: Store, color: "bg-blue-100 text-blue-600" },
							{
								key: "catalog",
								icon: ShoppingBag,
								color: "bg-violet-100 text-violet-600",
							},
							{
								key: "whatsapp",
								icon: MessageCircle,
								color: "bg-green-100 text-green-600",
							},
						].map(item => (
							<div
								key={item.key}
								className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
							>
								<div
									className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6`}
								>
									<item.icon className="w-8 h-8" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									{t(`Solution.list.${item.key}`)}
								</h3>
							</div>
						))}
					</div>

					<div className="text-center">
						<p className="text-lg font-medium text-gray-500 italic">
							&quot;{t("Solution.conclusion")}&quot;
						</p>
					</div>
				</div>
			</section>

			{/* Features Grid */}
			<section className="py-20 bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8">
					<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
						{/* Feature 1: Scan */}
						<div className="glass-panel bg-white/10 border-white/10 p-8 rounded-3xl">
							<div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
								<Barcode className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-3">
								{t("Features.scan.title")}
							</h3>
							<p className="text-gray-300 mb-6">
								{t("Features.scan.description")}
							</p>
							<div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
								{t("Features.scan.quote")}
							</div>
						</div>

						{/* Feature 2: Sync */}
						<div className="glass-panel bg-white/10 border-white/10 p-8 rounded-3xl">
							<div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
								<RefreshCw className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-3">
								{t("Features.sync.title")}
							</h3>
							<p className="text-gray-300">{t("Features.sync.description")}</p>
						</div>

						{/* Feature 3: WhatsApp */}
						<div className="glass-panel bg-white/10 border-white/10 p-8 rounded-3xl">
							<div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
								<MessageCircle className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-3">
								{t("Features.whatsapp.title")}
							</h3>
							<p className="text-gray-300">
								{t("Features.whatsapp.description")}
							</p>
						</div>

						{/* Feature 4: Delivery */}
						<div className="glass-panel bg-white/10 border-white/10 p-8 rounded-3xl">
							<div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
								<Truck className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-3">
								{t("Features.delivery.title")}
							</h3>
							<p className="text-gray-300">
								{t("Features.delivery.description")}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* WhatsApp Order Preview */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900">
							{t("WhatsAppPreview.title")}
						</h2>
					</div>

					<div className="max-w-md mx-auto bg-[#efeae2] rounded-2xl shadow-xl overflow-hidden border border-gray-200">
						<div className="bg-[#075e54] text-white p-4 flex items-center gap-3 shadow-sm">
							<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
								<Store className="w-5 h-5" />
							</div>
							<div className="font-semibold">Healthy Market</div>
						</div>
						<div className="p-6 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10">
							<div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-[85%] text-sm relative">
								<div className="font-bold text-gray-900 mb-2 text-md">
									📦 New Order #1023
								</div>
								<div className="space-y-2 mb-4 text-gray-700">
									<div className="flex justify-between border-b border-gray-100 pb-1">
										<span>2x Organic Milk</span>
										<span className="font-semibold">90 EGP</span>
									</div>
									<div className="flex justify-between border-b border-gray-100 pb-1">
										<span>1x Fresh Bread</span>
										<span className="font-semibold">15 EGP</span>
									</div>
								</div>
								<div className="flex justify-between font-bold text-gray-900 text-base mb-4">
									<span>Total</span>
									<span>105 EGP</span>
								</div>

								<div className="bg-gray-50 p-2 rounded text-xs text-gray-500 mb-3 flex items-start gap-2">
									<MapPin className="w-4 h-4 mt-0.5" />
									<span>123 Zamalek St, Cairo, Egypt</span>
								</div>

								<div className="w-full bg-[#25d366] text-white text-center py-2 rounded font-bold cursor-pointer hover:bg-[#128c7e] transition-colors">
									Tap to Confirm
								</div>

								<span className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent transform rotate-90"></span>
							</div>
							<div className="text-xs text-gray-400 mt-2 text-right">
								10:42 AM
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Video Showcase */}
			<section
				id="video-showcase"
				className="py-24 bg-white relative overflow-hidden"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
					<span className="text-violet-600 font-bold tracking-wider uppercase text-sm mb-4 block">
						{t("VideoShowcase.title")}
					</span>
					<div className="relative mx-auto max-w-5xl rounded-2xl shadow-2xl overflow-hidden glass-panel p-2">
						<video
							className="w-full h-auto rounded-xl bg-black"
							controls
							preload="metadata"
							poster="/video-poster.png"
						>
							<source src="/tijaratk-demo.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			</section>

			{/* Who is Tijaratk For */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-12">
						{t("WhoFor.title")}
					</h2>
					<div className="flex flex-wrap justify-center gap-4 mb-12">
						{Object.entries(t.raw("WhoFor.list")).map(([key, value]) => (
							<span
								key={key}
								className="px-6 py-3 rounded-full bg-white text-gray-800 shadow-sm border border-gray-200 font-medium text-lg"
							>
								{value as string}
							</span>
						))}
					</div>
					<p className="text-xl text-gray-600 font-medium">
						{t("WhoFor.conclusion")}
					</p>
				</div>
			</section>

			{/* Pricing Teaser */}
			<section className="py-24 bg-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
					<div className="glass-panel bg-gradient-to-br from-violet-50 to-indigo-50 p-12 rounded-[2.5rem]">
						<h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
							{t("Pricing.teaser")}
						</h2>
						<p className="text-2xl text-violet-600 font-medium">
							{t("Pricing.subTeaser")}
						</p>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-32 relative bg-gray-900 text-white overflow-hidden">
				<div className="absolute inset-0 bg-violet-900/20 z-0"></div>
				<div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500 rounded-full filter blur-[128px] opacity-40"></div>
				<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full filter blur-[128px] opacity-40"></div>

				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{t("FinalCTA.title")}
					</h2>
					<p className="text-xl text-gray-300 mb-10">
						{t("FinalCTA.subTitle")}
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Link
							href="/signup"
							className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-violet-900 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-2xl hover:scale-105 transform duration-200"
						>
							{t("FinalCTA.button")}
						</Link>
					</div>
					<p className="mt-6 text-sm text-gray-400">
						{t("FinalCTA.buttonSub")}
					</p>
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
