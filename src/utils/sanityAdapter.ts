import { Project } from '../types/project';

// Convert Sanity projects to your grid format
export function adaptSanityProjects(sanityProjects: any[]): Project[] {
  if (!sanityProjects || sanityProjects.length === 0) return [];

  // Grid layout configuration - alternating columns (0, 1, 2, 0, 1, 2...)
  const rowHeights = [
    [270, 230, 287],  // Row 1 heights for columns 0, 1, 2
    [230, 243, 461],  // Row 2
    [230, 345, 230],  // Row 3
    [518, 230, 287],  // Row 4
  ];

  const getGridPosition = (gridIndex: number) => {
    const column = gridIndex % 3;
    const row = Math.floor(gridIndex / 3);
    const height = rowHeights[row]?.[column] || 230;

    // Calculate translateY based on previous items in same column
    let translateY = 0;
    for (let i = 0; i < gridIndex; i++) {
      if (i % 3 === column) {
        const prevRow = Math.floor(i / 3);
        translateY += (rowHeights[prevRow]?.[column] || 230);
      }
    }

    return { column, translateY, height };
  };

  return sanityProjects.map((project, index) => {
    const isFirstProject = index === 0;
    const gridPosition = isFirstProject ? { column: 0, translateY: 0, height: 500 } : getGridPosition(index - 1);

    return {
      id: index + 1,
      _id: project._id,
      title: project.title,
      description: project.shortDescription || '',
      location: project.location || '',
      year: project.completionYear?.toString() || project.startYear?.toString() || '',
      image: project.thumbnailImage || project.heroImage || '',
      link: `/project/${project.slug?.current}`,
      slug: project.slug,
      
      // Grid layout
      isHero: isFirstProject,
      height: isFirstProject ? 500 : gridPosition.height,
      column: isFirstProject ? undefined : gridPosition.column,
      translateY: isFirstProject ? undefined : gridPosition.translateY,
      
      // Additional fields
      thumbnailImage: project.thumbnailImage,
      shortDescription: project.shortDescription,
      architect: project.architect,
      startYear: project.startYear,
      completionYear: project.completionYear,
    };
  });
}