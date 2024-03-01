import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { footer, footerIn, link, info } from './footer.module.scss';

export function Footer() {
	const data = useStaticQuery(graphql`
		query FooterQuery {
			footer: file(
				sourceInstanceName: { eq: "footer" }
				extension: { eq: "md" }
			) {
				childMarkdownRemark {
					frontmatter {
						linkData {
							href
							text
						}
						infoData
					}
				}
			}
		}
	`);

	const { linkData, infoData } = data.footer.childMarkdownRemark.frontmatter;

	return (
		<footer className={footer}>
			<div className={footerIn}>
				<a
					href={linkData.href}
					className={link}
					target="_blank"
					rel="noreferrer"
				>
					{linkData.text}
				</a>
				<div className={info}>{infoData}</div>
			</div>
		</footer>
	);
}

export default Footer;
