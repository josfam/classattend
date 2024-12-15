"""Remove explicit student and lecturer ids

Revision ID: 10c220a86969
Revises: 988a29c9c6c0
Create Date: 2024-12-15 13:55:26.361434

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '10c220a86969'
down_revision = '988a29c9c6c0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sessions')
    with op.batch_alter_table('lecturers', schema=None) as batch_op:
        batch_op.drop_column('staff_id')

    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.drop_column('student_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('student_id', sa.VARCHAR(length=60), nullable=False)
        )

    with op.batch_alter_table('lecturers', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('staff_id', sa.VARCHAR(length=60), nullable=False)
        )

    op.create_table(
        'sessions',
        sa.Column('id', sa.INTEGER(), nullable=False),
        sa.Column('session_id', sa.VARCHAR(length=255), nullable=True),
        sa.Column('data', sa.BLOB(), nullable=True),
        sa.Column('expiry', sa.DATETIME(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('session_id'),
    )
    # ### end Alembic commands ###