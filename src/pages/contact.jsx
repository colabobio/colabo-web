import * as React from 'react';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { ContactForm } from '../components/sections/contact-form';

function ContactPage() {
	return (
		<Layout>
			<Seo title="Contact" image="/images/contact.png" />
			<ContactForm />
		</Layout>
	);
}

export default ContactPage;
