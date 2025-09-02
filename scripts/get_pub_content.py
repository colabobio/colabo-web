import csv
import os

def create_publication_files(csv_filepath='publications.csv', output_dir='generated_publications'):
    """
    Reads a CSV file of publications and generates a directory structure
    with index.md files for a Gatsby site.

    Args:
        csv_filepath (str): The path to the input CSV file.
        output_dir (str): The name of the directory to save the generated files.
    """
    # Create the main output directory if it doesn't already exist.
    os.makedirs(output_dir, exist_ok=True)
    print(f"Output will be saved in the '{output_dir}' directory.")

    try:
        with open(csv_filepath, mode='r', encoding='utf-8') as infile:
            # Use DictReader to easily access columns by their header name.
            reader = csv.DictReader(infile)
            
            # Use enumerate to get a counter for the directory names and 'order' field.
            for i, row in enumerate(reader, 1):
                # Define the directory for the current publication (e.g., 'generated_publications/1/').
                pub_dir = os.path.join(output_dir, 'publication-' + str(i))
                os.makedirs(pub_dir, exist_ok=True)
                
                # --- Prepare data for YAML frontmatter ---

                # To prevent errors in the YAML format, we escape any single quotes
                # within the text fields by replacing them with two single quotes.
                title = row.get('title', '').replace("'", "''")
                authors = row.get('authors', '').replace("'", "''")
                publication = row.get('publication', '').replace("'", "''")

                # Build the list of links, checking if each value exists.
                links_content = "links:\n  [\n"
                has_links = False
                
                if row.get('pubmed'):
                    links_content += f"    {{ 'text': 'PUBMED', url: 'https://pubmed.ncbi.nlm.nih.gov/{row['pubmed']}'}},\n"
                    has_links = True

                if row.get('doi'):
                    links_content += f"    {{ 'text': 'DOI', url: 'https://doi.org/{row['doi']}'}},\n"
                    has_links = True
                
                if row.get('web'):
                    # The 'web' column gets a 'WEB' label for clarity on the website.
                    links_content += f"    {{ 'text': 'WEB', url: '{row['web']}'}},\n"
                    has_links = True
                
                links_content += "  ]\n"

                # If no links were found, don't include the 'links:' key.
                if not has_links:
                    links_content = ""

                # --- Assemble the final markdown content ---
                
                file_content = f"""---
title: '{title}'
authors: '{authors}'
publication: '{publication}'
{links_content}order: {i}
---
"""
                
                # Write the content to the index.md file.
                file_path = os.path.join(pub_dir, 'index.md')
                with open(file_path, 'w', encoding='utf-8') as outfile:
                    outfile.write(file_content)

                print(f"Successfully created: {file_path}")

    except FileNotFoundError:
        print(f"Error: The file '{csv_filepath}' was not found. Please ensure it's in the same directory as the script.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    # The script will look for 'publications.csv' in the same directory it is run from.
    create_publication_files()